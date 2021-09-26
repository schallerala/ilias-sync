import {Cookie, CookieJar, Store} from 'tough-cookie';
import { ToughCookieJar as GotToughCookieJar } from 'got';
import { ToughFileCookieStore } from './compatibility/ToughFileCookieStore';
import { closeSync, openSync } from 'fs';
import { promisify } from 'util';
import {IliasUrlProvider} from '../../ilias/IliasUrlProvider';

export class DlCookieJar extends CookieJar implements GotToughCookieJar {

    public static defaultCookiesFilePath: string = './cookies.txt';

    constructor(store?: Store) {
        super(DlCookieJar.getOrCreateFileCookieStore(store));
    }

    private static getOrCreateFileCookieStore (store: Store): Store {
        return store ? store : this.createFileCookieStore();
    }

    get cookieJarStore (): Store {
        return this['store'];
    }

    static createFileCookieStore (textFilePath: string = this.defaultCookiesFilePath, auto_sync: boolean = false): Store {
        // touch/create file if it doesn't exist
        closeSync(openSync(textFilePath, 'a'));
        return new ToughFileCookieStore(textFilePath, { auto_sync });
    }

    public async saveStore (): Promise<void> {
        if (this.cookieJarStore['save']) {
            const cookiesStoreSave = promisify(this.cookieJarStore['save']).bind(this.cookieJarStore);
            await cookiesStoreSave();
        }
    }
}

export async function getIliasClientCookie (cookieJar: CookieJar, urlProvider: IliasUrlProvider): Promise<Cookie | undefined> {
    return await getCookieKey(cookieJar, urlProvider.baseUrl, 'ilClientId', {
        allPaths: true,
        expire: false // get the cookie even when the cookie expired
    });
}

export async function getIliasSessionCookie (cookieJar: CookieJar, urlProvider: IliasUrlProvider): Promise<Cookie | undefined> {
    return await getCookieKey(cookieJar, urlProvider.baseUrl, 'PHPSESSID', {
        allPaths: true,
        expire: false // get the cookie even when the cookie expired
    });
}

export async function getCookieKey (cookieJar: CookieJar, currentUrl: string, cookieKey: string, options?: CookieJar.GetCookiesOptions): Promise<Cookie | undefined> {
    return (await cookieJar.getCookies(currentUrl, options))
                .find(cookie => cookie.key === cookieKey);
}
