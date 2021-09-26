import {IliasUrlProvider} from '../IliasUrlProvider';
import {CookieJar} from 'tough-cookie';

export interface ResourceProvider {
    skip (): Promise<boolean>
    persist (urlProvider: IliasUrlProvider, cookieJar: CookieJar): Promise<void>
    updateDbState (urlProvider: IliasUrlProvider): Promise<void>
}
