import { URL } from "url";

import {RefType} from './soap/wsdl/ILIASSoapWebservice/xml/RefTreeXml';

export class IliasUrlProvider {

    static readonly UNIBE_BASEURL = 'https://ilias.unibe.ch/';

    constructor(readonly baseUrl: string, readonly clientId: string) {
    }

    static getUniBernUrlProvider(clientId: string = 'ilias3_unibe' /* FIXME */): IliasUrlProvider {
        return new IliasUrlProvider(IliasUrlProvider.UNIBE_BASEURL, clientId);
    }

    get urlEncodedClientId (): string {
        return this.clientId; // fixme
    }

    getShibbolethPost(): URL {
        return new URL('/Shibboleth.sso/SAML2/POST', this.baseUrl);
    }

    getWsdlUrl(): URL {
        return new URL('/webservice/soap/server.php?wsdl', this.baseUrl);
    }

    getGotoURL(targetType: RefType, refId: number): URL {
        const goto = new URL('/goto.php', this.baseUrl);
        goto.searchParams.set('target', `${targetType}_${refId}`);

        return goto;
    }

    /**
     * Link to download a ref straight away.
     *
     * As read in Ilias source at: `\ilLink::_getStaticLink`
     *      `ILIAS_HTTP_PATH . '/goto_' . urlencode(CLIENT_ID) . '_' . $a_type . '_'
     *          . $a_ref_id . urlencode($append) . '.html'`
     *
     * For example: https://ilias.unibe.ch/goto_ilias3_unibe_file_1905771_download.html
     *
     * @param targetType usually, a file ref is expected, but you can try others too.
     * @param refId identity of the reference/object.
     */
    getDownloadURL(targetType: RefType, refId: number): URL {
        return new URL(`goto_${this.urlEncodedClientId}_${targetType}_${refId}_download.html`, this.baseUrl);
    }
}

export type LinkProvider = string | URL | ((urlProvider: IliasUrlProvider) => string | URL);

export function resolveLinkProvider (linkProvider: LinkProvider, urlProvider: IliasUrlProvider): string {
    if (typeof linkProvider === 'string' || linkProvider instanceof URL)
        return linkProvider.toString();

    return resolveLinkProvider(linkProvider(urlProvider), urlProvider);
}
