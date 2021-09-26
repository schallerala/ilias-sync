import {getIliasClientCookie, getIliasSessionCookie} from '../requests/cookies/DlCookieJar';
import {IliasHtmlScraper} from '../ilias/scraper/IliasHtmlScraper';
import {IliasSoapConnector} from '../ilias/soap/IliasSoapConnector';
import {IliasUrlProvider} from '../ilias/IliasUrlProvider';
import {IConnectorLogger} from '../requests/logger/IConnectorLogger';
import {CookieJar} from 'tough-cookie';
import {NoopLogger} from '../requests/logger/NoopLogger';
import {ObjectRefTreeScraper} from './ObjectRefTreeScraper';
import {IRef} from '../ilias/models/IRef';
import {flatMap} from '../utils/Array';
import {Course} from '../ilias/models/Course';

export class CoursesScraper {

    constructor(
        readonly htmlScraper: IliasHtmlScraper, readonly soapConnector: IliasSoapConnector) {
    }

    static async createScraper (
        urlProvider: IliasUrlProvider,
        cookieJar: CookieJar,
        logger: IConnectorLogger = new NoopLogger()
    ): Promise<CoursesScraper> {
        const htmlScraper = new IliasHtmlScraper(urlProvider, cookieJar, logger);

        const sessionCookie = await getIliasSessionCookie(cookieJar, urlProvider);
        const clientCookie = await getIliasClientCookie(cookieJar, urlProvider);

        const soapConnector = await IliasSoapConnector.createConnector(sessionCookie?.value, clientCookie?.value, urlProvider, logger);

        return new CoursesScraper(htmlScraper, soapConnector);
    }

    async getUserCourses(): Promise<Array<Course>> {
        const userRefId = await this.soapConnector.getLoggedUserRefId();
        return await this.soapConnector.getUserCourses(userRefId);
    }

    async queryRefId(refs: Array<IRef>): Promise<void> {
        // TODO query their description/paragraphs

        const refsTrees = await Promise.all(refs.map(ref => this.soapConnector.getRefTree(ref)));

        // getting the files, will go through the tree, create the files and attach them to their parent
        refsTrees.map(refTree => refTree.getFiles());

        await Promise.all(
            flatMap(
                refsTrees,
                refTree => [
                    this.queryExercises(refTree),
                    this.queryMediaCasts(refTree),
                    this.queryFolders(refTree)
                ]
            )
        );
    }

    private async queryFolders(refTree: ObjectRefTreeScraper): Promise<void> {
        const emptyFolders = refTree.getFolders();

        await this.queryRefId(emptyFolders);
    }

    private async queryExercises(refTree: ObjectRefTreeScraper): Promise<void> {
        const emptyExercises = refTree.getExercises();

        flatMap(
            await Promise.all(emptyExercises.map(exercise => this.htmlScraper.getAssignments(exercise))),
            assignments => assignments
        );
    }

    private async queryMediaCasts(refTree: ObjectRefTreeScraper): Promise<void> {
        const emptyMediaCasts = refTree.getMediaCasts();

        flatMap(
            await Promise.all(emptyMediaCasts.map(mediaCast => this.htmlScraper.getVideos(mediaCast))),
            videoItems => videoItems
        );
    }
}

export interface FileVersionStatus {

}

