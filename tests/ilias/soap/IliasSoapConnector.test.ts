import avaModule, {TestInterface} from 'ava';
import {IliasSoapConnector} from '../../../src/ilias/soap/IliasSoapConnector';
import {DlCookieJar, getIliasClientCookie, getIliasSessionCookie} from '../../../src/requests/cookies/DlCookieJar';
import {testIf} from '../../helpers/avaHelpers';
import {existsSync} from 'fs';
import {IliasUrlProvider} from '../../../src/ilias/IliasUrlProvider';

const ava = <TestInterface<{connector: IliasSoapConnector}>>avaModule;

ava.before('Prepare connector', async t => {
    const cookieJar = new DlCookieJar();
    const urlProvider = IliasUrlProvider.getUniBernUrlProvider();
    const sessionCookie = await getIliasSessionCookie(cookieJar, urlProvider);
    const clientCookie = await getIliasClientCookie(cookieJar, urlProvider);
    t.context.connector = await IliasSoapConnector.createConnector(sessionCookie.value, clientCookie.value, urlProvider);
});

const test = testIf(existsSync(DlCookieJar.defaultCookiesFilePath), ava);

test('Get user id', async t => {
    const { connector } = t.context;
    t.is(await connector.getLoggedUserRefId(), 2366114);
});

test('Get user classes', async t => {
    const { connector } = t.context;
    const courses = await connector.getUserCourses(2366114);
    t.assert(courses.length >= 10); // On January 2021, was enrolled in 10 classes
});
