import {Arguments, Argv, CommandBuilder} from 'yargs';
import {CoursesScraper} from '../controllers/CoursesScraper';
import {DlCookieJar} from '../requests/cookies/DlCookieJar';
import {IliasUrlProvider} from '../ilias/IliasUrlProvider';
import {FileLogger} from '../requests/logger/FileLogger';
import {NoopLogger} from '../requests/logger/NoopLogger';
import {createConnection} from 'typeorm';
import * as pMap from 'p-map';
import * as pFilter from 'p-filter';
import {flatMap} from '../utils/Array';

interface SyncOption {
    logResponses: boolean,
    concurrency: number,
    dryRun: boolean
}

export const command = 'sync'
export const describe = 'Sync local files with Ilias Bern'
export const builder: CommandBuilder = function syncBuilder (yargs: Argv<SyncOption>) {
    return yargs.options({
        logResponses: {
            alias: ['log'],
            describe: 'Log all request in files htmlResponse.log and soapResponse.log',
            type: 'boolean',
            default: false
        },
        concurrency: {
            alias: ['thread'],
            describe: 'Concurrent files download',
            type: 'number',
            default: 5
        },
        dryRun: {
            alias: ['dry'],
            describe: 'Check which files to sync',
            type: 'boolean',
            default: false
        }
    });
}

export const handler = async function authHandler ({ logResponses, concurrency, dryRun }: Arguments<SyncOption>) {
    const logger = logResponses
        ? new FileLogger()
        : new NoopLogger();

    const connection = await createConnection();

    const uniBernUrlProvider = IliasUrlProvider.getUniBernUrlProvider();
    const dlCookieJar = new DlCookieJar();
    const coursesScraper = await CoursesScraper.createScraper(uniBernUrlProvider, dlCookieJar, logger);

    const courses = await coursesScraper.getUserCourses();
    courses.forEach(c => c.fetchOrCreateRefObject());

    await coursesScraper.queryRefId(courses);
    const resourcesProviders = flatMap(courses, course => course.getResourcesProvider());

    try {
        const resourcesToPersist = await pFilter(resourcesProviders, async resourceProvider => {
            if (await resourceProvider.skip()) {
                console.log(`skipping ${resourceProvider['localFilePath']}`);
                return false;
            }
            return true
        });

        console.log(`Persisting ${resourcesToPersist.length} elements`);
        if (dryRun) {
            if (resourcesToPersist.length > 0)
                console.log(resourcesToPersist.map(resource => resource.getLocalPath()).join(", "));
            else
                console.log("Nothing to sync");
        }
        else {
            await pMap(resourcesToPersist, async resourceProvider => {
                await resourceProvider.persist(uniBernUrlProvider, dlCookieJar);
                await resourceProvider.updateDbState(uniBernUrlProvider);
            }, {
                concurrency,
                stopOnError: false // TODO think about it
            });
        }
    } finally {
        await connection.close();
    }
}
