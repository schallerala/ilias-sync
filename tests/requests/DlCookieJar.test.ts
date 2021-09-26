import { existsSync } from 'fs';
import { testIf } from '../helpers/avaHelpers';
import {DlCookieJar, getIliasClientCookie, getIliasSessionCookie} from '../../src/requests/cookies/DlCookieJar';
import avaModule, {TestInterface} from 'ava';
import {IliasUrlProvider} from '../../src/ilias/IliasUrlProvider';

const ava = <TestInterface<{urlProvider: IliasUrlProvider}>>avaModule;

ava.before('Prepare connector', async t => {
    t.context.urlProvider = IliasUrlProvider.getUniBernUrlProvider();
});

const test = testIf(existsSync(DlCookieJar.defaultCookiesFilePath), ava);

test('Test persisted cookie', async t => {
    const { urlProvider } = t.context;
    const cookieJar = new DlCookieJar();
    const iliasCookies = await cookieJar.getCookies(urlProvider.baseUrl, {
        allPaths: true,
        expire: false // get the cookie even when the cookie expired
    });

    const clientCookieCount = iliasCookies.filter(cookie => cookie.key === "ilClientId").length;
    const iliasCookieKeys = iliasCookies.map(cookie => cookie.key).join(',');
    t.is(clientCookieCount, 1,
        `Looking for a cookie 'ilClientId' among:\n\t${iliasCookieKeys}.\nThis requires to be authenticated and have the cookies persisted`
    );
});

test('Test get ilias client cookie', async t => {
    const { urlProvider } = t.context;
    const cookieJar = new DlCookieJar();
    const iliasClientCookie = await getIliasClientCookie(cookieJar, urlProvider);
    t.truthy(iliasClientCookie);
});

test('Test get ilias session cookie', async t => {
    const { urlProvider } = t.context;
    const cookieJar = new DlCookieJar();
    const iliasSessionCookie = await getIliasSessionCookie(cookieJar, urlProvider);
    t.truthy(iliasSessionCookie);
});

