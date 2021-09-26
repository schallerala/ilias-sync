import avaModule, {TestInterface} from 'ava';
import {existsSync, readFileSync} from 'fs';
import {join} from 'path';
import { URL } from "url";

import {testIf} from '../../helpers/avaHelpers';
import {IliasHtmlScraper} from '../../../src/ilias/scraper/IliasHtmlScraper';
import {DlCookieJar} from '../../../src/requests/cookies/DlCookieJar';
import {IliasUrlProvider} from '../../../src/ilias/IliasUrlProvider';
import {Exercise} from '../../../src/ilias/models/Exercise';
import {Course} from '../../../src/ilias/models/Course';
import {File} from '../../../src/ilias/models/File';
import {AssignmentFile, AssignmentFileType} from '../../../src/ilias/models/Assignment';

const ava = <TestInterface<{
    scraper: IliasHtmlScraper}>>avaModule;

const fakeExercise = new Exercise(1899397, '', new Course(-1, ''));

ava.before('Prepare scraper', async t => {
    t.context.scraper = new IliasHtmlScraper(IliasUrlProvider.getUniBernUrlProvider());
});

const test = testIf(existsSync(DlCookieJar.defaultCookiesFilePath), ava);

test('Get multiple files from tutors from exercise page', async t => {
    const { scraper } = t.context;
    const assignments = await scraper.getAssignments(new Exercise(1938169, '', new Course(-1, '')));
    t.is(assignments.length, 1);

    const assignment = assignments[0];
    t.truthy(assignment.files.find(({ downloadLink }) => downloadLink.searchParams.get('file') === 'Problem Set 03.pdf' && downloadLink.searchParams.get('cmd') === 'downloadFile'));
    t.truthy(assignment.files.find(({ downloadLink }) => downloadLink.searchParams.get('file') === 'computer.txt' && downloadLink.searchParams.get('cmd') === 'downloadFile'));
});

test('Extract filename from link', t => {
    const { scraper } = t.context;
    t.is(
        scraper.getFilenameFromDownloadLink(new URL('ilias.php?ref_id=1938169&file=Problem+Set+03.pdf&ass_id=19884&cmd=downloadFile&cmdClass=ilexsubmissiongui&cmdNode=e1:qp:eh&baseClass=ilexercisehandlergui', IliasUrlProvider.UNIBE_BASEURL)),
        'Problem Set 03.pdf'
    );
    t.is(
        scraper.getFilenameFromDownloadLink(new URL('ilias.php?ref_id=1938169&file=computer.txt&ass_id=19884&cmd=downloadFile&cmdClass=ilexsubmissiongui&cmdNode=e1:qp:eh&baseClass=ilexercisehandlergui', IliasUrlProvider.UNIBE_BASEURL)),
        'computer.txt'
    );
});

// no need to be connected
ava('Extract multiple assignments and feedback files', t => {
    const { scraper } = t.context;
    const responseBody = readFileSync(join(__dirname, 'resources', 'exercisePageWithMultipleAssignments.html')).toString();
    const assignments = scraper.scrapAssignments(responseBody, fakeExercise);
    t.assert(assignments.length === 13);

    const firstAssignment = assignments[0];
    t.assert(firstAssignment.exercise.refId === 1899397);
    t.assert(firstAssignment.name === 'Exercise Sheet 01 (Mandatory)');
    // Start Time   16. Sep 2020, 08:30
    t.truthy(firstAssignment.getNamedProperty('Start Time')?.value === '16. Sep 2020, 08:30');
    // Ended On     21. Sep 2020, 12:00
    t.truthy(firstAssignment.getNamedProperty('Ended On')?.value === '21. Sep 2020, 12:00');

    t.assert(firstAssignment.files.length === 2);
    // first is the given exercise file
    t.truthy(findAssignmentFile(firstAssignment.files, 'serie01.pdf', 'ass_given'));
    // second is the feedback/solution file
    t.truthy(findAssignmentFile(firstAssignment.files, 'sol01.pdf', 'ass_feedback'));

    const lastAssignment = assignments[assignments.length - 1];
    t.assert(lastAssignment.exercise.refId === 1899397);
    t.assert(lastAssignment.name === 'Recap Exercises');
    // Edit Until     11. Feb 2021, 16:20
    t.truthy(lastAssignment.getNamedProperty('Edit Until')?.value === '11. Feb 2021, 16:20');

    t.assert(lastAssignment.files.length === 1);
    // first is the given exercise file
    t.truthy(findAssignmentFile(lastAssignment.files, 'serieRecap.pdf', 'ass_given'));
});

ava('Parse exercise page with properties without keys', t => {
    const { scraper } = t.context;
    const responseBody = readFileSync(join(__dirname, 'resources', 'exercisePageWithPropertiesWithoutKey.html')).toString();
    const assignments = scraper.scrapAssignments(responseBody, fakeExercise);

    t.assert(assignments.length === 1);

    const firstAssignment = assignments[0];

    t.is(firstAssignment.properties.length, 8);

    t.is(firstAssignment.files.length, 3);
    t.truthy(findAssignmentFile(firstAssignment.files, 'Problem Set 02.pdf', 'ass_given'));
    t.truthy(findAssignmentFile(firstAssignment.files, 'scotts.txt', 'ass_given'));
    t.truthy(findAssignmentFile(firstAssignment.files, 'Problem Set 02 Solution.zip', 'ass_feedback'));
});

function findAssignmentFile (files: Array<AssignmentFile>, expectedFilename: string, assignmentFileType: AssignmentFileType) {
    return files.find(({ filename, downloadLink }) =>
        filename === expectedFilename
            && AssignmentFile.getAssignmentFileTypeFromDownloadLink(downloadLink.toString()) === assignmentFileType
    );
}
