import { DlCookieJar } from '../requests/cookies/DlCookieJar';
import {IliasUrlProvider} from '../ilias/IliasUrlProvider';
import {LoggingGotClient} from '../requests/LoggingGotClient';
import {CookieJar} from 'tough-cookie';

export class Authenticator {
    constructor(
        private readonly username: string,
        private readonly password: string,
        private readonly urlProvider: IliasUrlProvider = IliasUrlProvider.getUniBernUrlProvider(),
        readonly cookieJar: CookieJar = new DlCookieJar()
    ) { }

    async authenticate () {
        const gotClient = LoggingGotClient.createLoggingGotClient().extend({
            cookieJar: this.cookieJar
        });

        // POST https://wayf.switch.ch/SWITCHaai/WAYF?entityID=https%3A%2F%2Filias.unibe.ch%2Fshibboleth&return=https%3A%2F%2Filias.unibe.ch%2FShibboleth.sso%2FLogin%3FSAMLDS%3D1%26target%3Dhttps%253A%252F%252Filias.unibe.ch%252Fshib_login.php%253Ftarget%253Droot_1
        //      302
        //      location: https://ilias.unibe.ch/Shibboleth.sso/Login?SAMLDS=1&target=https%3A%2F%2Filias.unibe.ch%2Fshib_login.php%3Ftarget%3Droot_1&entityID=https%3A%2F%2Faai.unifr.ch%2Fidp%2Fshibboleth
        //      request body:
        //          request_type: embedded
        //          user_idp: https://aai.unifr.ch/idp/shibboleth or https://aai-idp.unibe.ch/idp/shibboleth
        //          Login: Login

        const response0 = await gotClient.post('https://wayf.switch.ch/SWITCHaai/WAYF?entityID=https%3A%2F%2Filias.unibe.ch%2Fshibboleth&return=https%3A%2F%2Filias.unibe.ch%2FShibboleth.sso%2FLogin%3FSAMLDS%3D1%26target%3Dhttps%253A%252F%252Filias.unibe.ch%252Fshib_login.php%253Ftarget%253Droot_1', {
            form: {
                request_type: 'embedded',
                user_idp: 'https://aai.unifr.ch/idp/shibboleth',
                Login: 'Login'
            },
            methodRewriting: false
        });

        // reached GET ...execution=e1s1
        // console.log('Redirect to UNIFR SAML', response0);

        // POST execution=e1s1
        const response1 = await gotClient.post('https://unifr.login.eduid.ch/idp/profile/SAML2/Redirect/SSO?execution=e1s1', {
            form: {
                // TODO retrieve those from the html? Or go like this?
                'shib_idp_ls_exception.shib_idp_session_ss': '',
                'shib_idp_ls_success.shib_idp_session_ss': true,
                'shib_idp_ls_value.shib_idp_session_ss': '',
                'shib_idp_ls_exception.shib_idp_persistent_ss': '',
                'shib_idp_ls_success.shib_idp_persistent_ss': true,
                'shib_idp_ls_value.shib_idp_persistent_ss': '',
                'shib_idp_ls_supported': true,
                '_eventId_proceed': ''
            },
            methodRewriting: false
        });

        const response2 = await gotClient.post('https://unifr.login.eduid.ch/idp/profile/SAML2/Redirect/SSO?execution=e1s2', {
            form: {
                j_username: this.username,
                j_password: this.password,
                _eventId_proceed: ''
            },
            methodRewriting: false
        });

        // console.log('UNIFR SAML login response', response2);

        if (response2.body.includes("failed")) {
            throw new Error("Invalid credentials");
        }

        const response3 = await gotClient.post('https://unifr.login.eduid.ch/idp/profile/SAML2/Redirect/SSO?execution=e1s3', {
            form: {
                'shib_idp_ls_exception.shib_idp_session_ss': '',
                'shib_idp_ls_success.shib_idp_session_ss': true,
                '_eventId_proceed': ''
            },
            methodRewriting: false
        });

        // console.log('UNIFR SAML end auth and get relay state and SAML response', response3);

        /*
         * Get a form in the previous response:
         *  <form action="https&#x3a;&#x2f;&#x2f;ilias.unibe.ch&#x2f;Shibboleth.sso&#x2f;SAML2&#x2f;POST" method="post">
         *      <div>
         *          <input type="hidden" name="RelayState" value="ss&#x3a;mem&#x3a;1679eb7adc4977c6c5ddf67becd97970640b65ab8527750669a781ba4a4f6a95"/>
         *          <input type="hidden" name="SAMLResponse" value="PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHNhbWwyc...+PC9zYW1sMnA6UmVzcG9uc2U+"/>
         *      </div>
         *      <!-- ... -->
         *  </form>
         * Get the `RelayState` and `SAMLResponse`
         */

        const relayStateRegex = /name="RelayState" value="ss&#x3a;mem&#x3a;(.*)"/
        const samlResponseRegex = /name="SAMLResponse" value="(.*)"/

        const relayMatches = response3.body.match(relayStateRegex);
        if ( ! relayMatches)
            throw new Error("Failed to get relay state values");

        const relayState = relayMatches[1];
        const samlResponse = response3.body.match(samlResponseRegex)[1];

        const response4 = await gotClient.post(this.urlProvider.getShibbolethPost(), {
            form: {
                'RelayState': `ss:mem:${relayState}`,
                'SAMLResponse': samlResponse
            },
            methodRewriting: false
        });

        // GET https://ilias.unibe.ch/Shibboleth.sso/Login?SAMLDS=1&target=https%3A%2F%2Filias.unibe.ch%2Fshib_login.php%3Ftarget%3Droot_1&entityID=https%3A%2F%2Faai.unifr.ch%2Fidp%2Fshibboleth
        //      302
        //      location: https://unifr.login.eduid.ch/idp/profile/SAML2/Redirect/SSO?SAMLRequest=fZJdT4MwFIb%2FCun9KDDcpBkkuF24ZOoy0AtvDJSz0aS02FP8%2BPfCmDov3HXfj%2FM%2B6QKLRrYs7WytdvDaAVrno5EK2fEhJp1RTBcokKmiAWSWsyy927DA9VhrtNVcS%2BKkiGCs0GqpFXYNmAzMm%2BDwuNvEpLa2RUapkKJAt1OiBJfXNKtFWWoJtnYRNR1SA7p9yHLirPozhCqGwF97b9wbV%2BqDUC5UnaiGEFG1tD9jLyScEnZQCQPc0ix7IM56FZOXOVQ8uOaR58E8glkZlhDM%2FHIa%2Bp7Po8jvZYgdrBXaQtmYBF7gTfxgMvVy%2F4qFc%2BaHz8TZntbeCFUJdbiMphxFyG7zfDsZVz2BweOiXkCSxQCYHYvNGfLLscU3Z5L8QxV%2FqC7oWcNY17L7PnK92mop%2BKeTSqnflwYKCzHxCU1Gy9%2FvkHwB&RelayState=ss%3Amem%3A98d6de0d60f1a166b7d0123d0245f01996e59672f00a65487c0832297fe15c90

        // GET https://unifr.login.eduid.ch/idp/profile/SAML2/Redirect/SSO?SAMLRequest=fZJdT4MwFIb%2FCun9KDDcpBkkuF24ZOoy0AtvDJSz0aS02FP8%2BPfCmDov3HXfj%2FM%2B6QKLRrYs7WytdvDaAVrno5EK2fEhJp1RTBcokKmiAWSWsyy927DA9VhrtNVcS%2BKkiGCs0GqpFXYNmAzMm%2BDwuNvEpLa2RUapkKJAt1OiBJfXNKtFWWoJtnYRNR1SA7p9yHLirPozhCqGwF97b9wbV%2BqDUC5UnaiGEFG1tD9jLyScEnZQCQPc0ix7IM56FZOXOVQ8uOaR58E8glkZlhDM%2FHIa%2Bp7Po8jvZYgdrBXaQtmYBF7gTfxgMvVy%2F4qFc%2BaHz8TZntbeCFUJdbiMphxFyG7zfDsZVz2BweOiXkCSxQCYHYvNGfLLscU3Z5L8QxV%2FqC7oWcNY17L7PnK92mop%2BKeTSqnflwYKCzHxCU1Gy9%2FvkHwB&RelayState=ss%3Amem%3A98d6de0d60f1a166b7d0123d0245f01996e59672f00a65487c0832297fe15c90
        //      302
        //      location: /idp/profile/SAML2/Redirect/SSO?execution=e1s1 or e2s1

        // GET https://unifr.login.eduid.ch/idp/profile/SAML2/Redirect/SSO?execution=e2s1

        // POST https://unifr.login.eduid.ch/idp/profile/SAML2/Redirect/SSO?execution=e2s1
        //      302
        //      location: /idp/profile/SAML2/Redirect/SSO?execution=e2s2
        //      set-cookie: shib_idp_session=14f5c9063556ccb5be77ccd3ea7507e88eeb049cb86c569aef1539a550da2d21; Domain=eduid.ch; Path=/; Secure; HttpOnly
        //      request body: j_username, j_password, _eventId_proceed: ""

        // GET https://unifr.login.eduid.ch/idp/profile/SAML2/Redirect/SSO?execution=e2s2

        // POST https://unifr.login.eduid.ch/idp/profile/SAML2/Redirect/SSO?execution=e2s2
        //      200
        //      request body: shib_idp_ls_exception.shib_idp_session_ss: "", shib_idp_ls_success.shib_idp_session_ss: true

        // POST https://ilias.unibe.ch/Shibboleth.sso/SAML2/POST
        //      302
        //      location: https://ilias.unibe.ch/Shibboleth.sso/Session
        //      set-cookie: _shibsession_64656661756c7468747470733a2f2f696c6961732e756e6962652e63682f73686962626f6c657468=_7e7f55df4cf97c9206cbb802f008e15f; path=/; secure; HttpOnly
        //      set-cookie ?: SERVERID=ilias-webp4; path=/
        //      request body: RelayState: ss:mem:..., SAMLResponse: ...

        console.log('logged');
    }
}
