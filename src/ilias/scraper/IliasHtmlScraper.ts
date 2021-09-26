import * as cheerio from 'cheerio';
import got, {Got} from 'got';
import {ToughCookieJar} from 'got/dist/source/core';
import { URL } from "url";
import { basename, extname } from "path";

import {DlCookieJar} from '../../requests/cookies/DlCookieJar';
import {IliasUrlProvider} from '../IliasUrlProvider';
import {IConnectorLogger} from '../../requests/logger/IConnectorLogger';
import {NoopLogger} from '../../requests/logger/NoopLogger';
import {LoggingGotClient} from '../../requests/LoggingGotClient';
import {Assignment, AssignmentProperty} from '../models/Assignment';
import {Exercise} from '../models/Exercise';
import {MediaCast, VideoItem} from '../models/MediaCast';

export class IliasHtmlScraper {

    private readonly gotClient: Got;

    constructor(
        readonly urlProvider: IliasUrlProvider,
        readonly cookieJar: ToughCookieJar = new DlCookieJar(),
        readonly logger: IConnectorLogger = new NoopLogger()
    ) {
        this.gotClient = LoggingGotClient.createLoggingGotClient(got, logger);
    }

    async getAssignments (exercise: Exercise): Promise<Array<Assignment>> {
        // Something of the like: https://ilias.unibe.ch/goto.php?target=exc_${refId}
        // The goto will redirect to the full url of the exercise with baseclass etc.
        // Slicker way to access it.
        const response = await this.gotClient.get(this.urlProvider.getGotoURL('exc', exercise.refId), {
            cookieJar: this.cookieJar
        });

        if (Math.floor(response.statusCode / 100) !== 2)
            throw new Error("Must authenticate first/again");

        return this.scrapAssignments(response.body, exercise);

        // Before scrapping:
        // // Look for hrefs with a 'file' search parameter
        // // for example: <a href="ilias.php?ref_id=1899397&file=serie11.pdf&ass_id=20687&cmd=downloadFile&cmdClass=ilexsubmissiongui&cmdNode=e1:qp:eh&baseClass=ilexercisehandlergui">Download</a>
        // const providedFileLinks = collectFirstGroupMatch(/\bhref\b="([^"]+\bfile\b[^"]+)"/gi, response.body)
        //     .map(href => {
        //         const downloadLink = new URL(href, this.urlProvider.baseUrl);
        //         const filename = this.getFilenameFromDownloadLink(downloadLink);
        //     })
        //
        // // For solutions, we won't get named files
        // // for example: <a href="ilias.php?ref_id=1899397&ass_id=20687&cmd=downloadGlobalFeedbackFile&cmdClass=ilexsubmissiongui&cmdNode=e1:qp:eh&baseClass=ilexercisehandlergui">Download</a>
        // // ... unless we go through the HTML
        //
        // /*
        //     <div class="form-group">
        //         <div class="il_InfoScreenProperty control-label col-xs-3">sol12.pdf</div>
        //         <div class="il_InfoScreenPropertyValue col-xs-9">
        //             <a href="ilias.php?ref_id=1899397&ass_id=20837&cmd=downloadGlobalFeedbackFile&cmdClass=ilexsubmissiongui&cmdNode=e1:qp:eh&baseClass=ilexercisehandlergui">Download</a>
        //         </div>
        //     </div>
        //  */
    }

    scrapAssignments(body: string, exercise: Exercise): Array<Assignment> {
        const $ = cheerio.load(body);

        // $('.ilExcOverview .il_VAccordionInnerContainer')
        //      .map((i, e) =>
        //               $(e).find('.il_InfoScreenProperty')
        //                   .map((i, e) => $(e).text())
        //                   .toArray()
        //      )
        //      .toArray()
        // [
        //   'serie01.pdf',            'Start Time',             'Ended On',
        //   'Remaining Working Time', 'Submitted Files',        'sol01.pdf',
        //   'serie02.pdf',            'Start Time',             'Ended On',
        //   'Remaining Working Time', 'Submitted Files',        'sol02.pdf',
        //   'serie03.pdf',            'Ended On',               'Remaining Working Time',
        //   'Submitted Files',        'sol03.pdf',              'serie04.pdf',
        //   'Start Time',             'Ended On',               'Remaining Working Time',
        //   'Submitted Files',        'sol04.pdf',              'serie05.pdf',
        //   'Ended On',               'Remaining Working Time', 'Submitted Files',
        //   'sol05.pdf',              'serie06.pdf',            'Ended On',
        //   'Remaining Working Time', 'Submitted Files',        'sol06.pdf',
        //   'serie07_noex4.pdf',      'Ended On',               'Remaining Working Time',
        //   'Submitted Files',        'sol07.pdf',              'serie08.pdf',
        //   'Ended On',               'Remaining Working Time', 'Submitted Files',
        //   'sol08.pdf',              'serie09.pdf',            'Ended On',
        //   'Remaining Working Time', 'Submitted Files',        'sol09.pdf',
        //   'serie10.pdf',            'Ended On',               'Remaining Working Time',
        //   'Submitted Files',        'sol10.pdf',              'serie11.pdf',
        //   'Ended On',               'Remaining Working Time', 'Submitted Files',
        //   'sol11.pdf',              'serie12.pdf',            'Ended On',
        //   'Remaining Working Time', 'Submitted Files',        'sol12.pdf',
        //   'serieRecap.pdf',         'Edit Until',             'Remaining Working Time',
        //   'Submitted Files'
        // ]

        // $('.ilExcOverview .il_VAccordionInnerContainer')
        //      .map((i, e) =>
        //              $(e).find('.il_InfoScreenPropertyValue')
        //                  .map((i, e) => $(e).text().trim())
        //                  .toArray()
        //      )
        //      .toArray()
        // [
        //   'Download',
        //   '16. Sep 2020, 08:30',
        //   '21. Sep 2020, 12:00',
        //   'Time is up.',
        //   'You have not submitted any files.',
        //   'Download',
        //   'Download',
        //   '23. Sep 2020, 08:50',
        //   '28. Sep 2020, 12:00',
        //   'Time is up.',
        //   'You have not submitted any files.',
        //   'Download',
        //   'Download',
        //   '05. Oct 2020, 12:00',
        //   'Time is up.',
        //   'You have not submitted any files.',
        //   'Download',
        //   'Download',
        //   '07. Oct 2020, 10:40',
        //   '12. Oct 2020, 12:00',
        //   'Time is up.',
        //   'You have not submitted any files.',
        //   'Download',
        //   'Download',
        //   '19. Oct 2020, 12:00',
        //   'Time is up.',
        //   'You have not submitted any files.',
        //   'Download',
        //   'Download',
        //   '26. Oct 2020, 12:00',
        //   'Time is up.',
        //   'You have not submitted any files.',
        //   'Download',
        //   'Download',
        //   '02. Nov 2020, 12:00',
        //   'Time is up.',
        //   'You have not submitted any files.',
        //   'Download',
        //   'Download',
        //   '09. Nov 2020, 12:00',
        //   'Time is up.',
        //   'You have not submitted any files.',
        //   'Download',
        //   'Download',
        //   '16. Nov 2020, 12:00',
        //   'Time is up.',
        //   'You have not submitted any files.',
        //   'Download',
        //   'Download',
        //   '23. Nov 2020, 12:00',
        //   'Time is up.',
        //   'You have not submitted any files.',
        //   'Download',
        //   'Download',
        //   '30. Nov 2020, 12:00',
        //   'Time is up.',
        //   'You have not submitted any files.',
        //   'Download',
        //   'Download',
        //   '07. Dec 2020, 12:00',
        //   'Time is up.',
        //   'You have not submitted any files.',
        //   'Download',
        //   'Download',
        //   '11. Feb 2021, 16:20',
        //   '30 Days, 14 Hours, 1 Minute',
        //   'You have not submitted any files. Hand In'
        // ]
        return cheerioMap(
            $('.ilExcOverview .il_VAccordionInnerContainer'),
            (index, accordion) => {
                const accordion$ = $(accordion);

                const assignmentTitle = accordion$.find('.ilAssignmentHeader').text().trim();

                const assignmentProperties = cheerioMap(
                    accordion$.find('.form-group'),
                    (index, formGroup) => {
                        const formGroup$ = $(formGroup);

                        const propertyKey = formGroup$.find('.il_InfoScreenProperty').text().trim() || '';

                        const propertyValue$ = formGroup$.find('.il_InfoScreenPropertyValue');
                        const propertyValue = propertyValue$.text().trim() || '';

                        const propertyValueFirstLink = propertyValue$.find('a[href]').first();
                        const downloadLink = propertyValue.toLowerCase() === 'download' && propertyValueFirstLink.length
                            // TODO could also resolve filename and file size with a HEAD HTTP request
                            ? new URL(propertyValueFirstLink.attr('href'), this.urlProvider.baseUrl)
                            : null;

                        return new AssignmentProperty(propertyKey, propertyValue, downloadLink);
                    }
                );

                return new Assignment(assignmentTitle, exercise, assignmentProperties);
            }
        );
    }

    async getVideos (mediaCast: MediaCast): Promise<Array<VideoItem>> {
        const response = await this.gotClient.get(this.urlProvider.getGotoURL('mcst', mediaCast.refId), {
            cookieJar: this.cookieJar
        });

        if (Math.floor(response.statusCode / 100) !== 2)
            throw new Error("Must authenticate first/again");

        return this.scrapVideos(response.body, mediaCast);

    }

    scrapVideos(body: string, mediaCast: MediaCast): Array<VideoItem> {
        const $ = cheerio.load(body);

        return cheerioMap(
            $('table.fullwidth tbody tr'),
            (index, tableRow) => {
                const tableRow$ = $(tableRow);

                const videoTitle = tableRow$.find('td:first-child p:first-child').text().trim();
                const dlHref = tableRow$.find('td:nth-child(2) a').attr("href");

                if ( ! dlHref) {
                    // console.warn('No download link[' + mediaCast.path + ']: ' +
                    //     this.urlProvider.getGotoURL('mcst', mediaCast.refId).toString());

                    const videoTag = tableRow$.find('video');

                    // // when the page isn't loaded with js, the `video` tag as a child tag `source` tag
                    // // with an attributes `src` and `type` (for example: 'video/mp4')
                    const videoSourceTag = tableRow$.find('video source');

                    const videoSource = videoSourceTag.length == 1
                        ? videoSourceTag.attr('src')
                        : videoTag.attr('src');

                    const downloadLink = new URL(videoSource, this.urlProvider.baseUrl);

                    // in case we don't have access to the video type, try to retrieve the extension from the last
                    // level of the download link:
                    //  URL: https://ilias.unibe.ch/data/ilias3_unibe/mobs/mm_2615261/pr-lecture5-audiolecture.mp4?...
                    //  --> pr-lecture5-audiolecture.mp4
                    //  --> .mp4
                    const lastDlLevel = basename(downloadLink.pathname);

                    const extension = videoSourceTag.length == 1
                        ? "." + videoSourceTag.attr('type').split('/')[1]
                        : extname(lastDlLevel);

                    return new VideoItem(`${videoTitle}${extension}`, downloadLink, mediaCast);
                }

                const downloadLink = new URL(dlHref, this.urlProvider.baseUrl);
                // for example: "Download (video/mp4, 83.6 MB)"
                const downloadAndSize = tableRow$.find('td:nth-child(2) p:last-child').text().trim();
                // only match MB unit
                const extensionAndSizeMatch = downloadAndSize.match(/\(.*\/([a-z0-9]+),\s*([0-9]+[.,][0-9])\s*MB\)/);
                if ( ! extensionAndSizeMatch)
                    console.warn('Unable to parse video file extension and/or size: \'' + downloadAndSize +
                        '\' at ' + this.urlProvider.getGotoURL('mcst', mediaCast.refId).toString());

                // TODO head download link, to get filename
                const extension = extensionAndSizeMatch ? extensionAndSizeMatch[1] : 'mp4';
                const mbFileSize = extensionAndSizeMatch ? parseInt(extensionAndSizeMatch[2]) * 1024 * 1024 : 0;

                return new VideoItem(`${videoTitle}.${extension}`, downloadLink, mediaCast, mbFileSize);
            }
        )
    }

    /**
     * @deprecated
     */
    async getClassesLink(): Promise<Array<URL>> {
        const response = await this.gotClient.get(new URL('/ilias.php?cmdClass=ilmembershipoverviewgui&cmdNode=mb&baseClass=ilmembershipoverviewgui', this.urlProvider.baseUrl), {
            cookieJar: this.cookieJar,
            followRedirect: false
        });

        if (Math.floor(response.statusCode / 100) !== 2)
            throw new Error("Must authenticate first/again");

        return collectFirstGroupMatch(/\bhref\b="([^"]+unibe_crs[^"]+)"/gi, response.body)
            .map(href => new URL(href, this.urlProvider.baseUrl));
    }

    getFilenameFromDownloadLink (url: URL): string {
        if ( ! url)
            throw new Error("Pass a valid url");
        const fileSearchParameter = url.searchParams.get('file');
        if ( ! fileSearchParameter)
            throw new Error("Pass a valid url with a file search parameter");

        return fileSearchParameter;
    }
}

function collectFirstGroupMatch (regex: RegExp, body: string) {
    let match;
    const matches: Array<string> = [];
    while (match = regex.exec(body)) {
        matches.push(match[1]);
    }

    return matches;
}

const dummyRoot = cheerio.load('');
type CheerioRoot = ReturnType<typeof cheerio.load>;
type Cheerio = ReturnType<typeof dummyRoot.root>;
type CheerioElement = Parameters<typeof dummyRoot.contains>[0];

function cheerioMap<R> ($: Cheerio, callbackfn: (index: number, element: CheerioElement) => R): Array<R> {
    const result: Array<R> = [];
    $.each((index, element) => result.push(callbackfn(index, element)));
    return result;
}
