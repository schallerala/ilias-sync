import * as FileCookieStore from 'file-cookie-store';

const originalFindCookies = FileCookieStore.prototype.findCookies;
FileCookieStore.prototype.findCookies = function (host, path, _allowSpecialUseDomain, cb) {
    // FIX and drop allowSpecialUseDomain that file-cookie-store doesn't support and that
    // tough-cookie pass as 3rd parameter in its method `DlCookieJar.getCookies()`.
    originalFindCookies.call(this, host, path, cb);
}

export const ToughFileCookieStore = FileCookieStore;
