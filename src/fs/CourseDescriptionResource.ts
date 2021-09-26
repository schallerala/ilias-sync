import {ResourceProvider} from '../ilias/models/ResourceProvider';
import {IliasUrlProvider, LinkProvider, resolveLinkProvider} from '../ilias/IliasUrlProvider';
import {CookieJar} from 'tough-cookie';
import {existsSync, statSync} from 'fs';
import {getRepository} from 'typeorm';
import {Resource, RootRefObject} from '../entities/Resource';
import { join } from 'path';
import {writeFile} from 'fs/promises';
import { createHash } from 'crypto';
import {createNecessaryFolders} from './persisterHelpers';

export class CourseDescriptionResource implements ResourceProvider {

    constructor(
        readonly refId: number,
        readonly courseName: string,
        readonly coursePath: string,
        readonly targetLink: LinkProvider,
        readonly description?: string,
        readonly syllabus?: string,
        readonly importantInformation?: string
    ) { }

    get localFilePath (): string {
        return join(this.coursePath, 'CourseDescription.md');
    }

    async skip(): Promise<boolean> {
        if (existsSync(this.localFilePath)) {
            const filesize = statSync(this.localFilePath).size;
            if (filesize === 0)
                return false;

            const repository = getRepository(Resource);
            const dbResource = await repository.findOne({ saveTo: this.localFilePath });
            if ( ! dbResource)
                return false;

            if (this.hashContent() != dbResource.hash) {
                console.warn(`Description of ${this.courseName} changed.`);
                return false;
            }

            // TODO improve got head etc.
            if (dbResource.fileSize === 0)
                return true;

            // FIXME
            return true;

            // const fileVersion = this.resourceOptions.fileVersion;
            // if (fileVersion && fileVersion > dbResource.fileVersion)
            //     return true;
        }

        return false;
    }

    async persist(urlProvider: IliasUrlProvider, cookieJar: CookieJar): Promise<void> {
        console.log(`persisting course description of ${this.courseName}`);
        await createNecessaryFolders(this.localFilePath);
        await writeFile(this.localFilePath, this.fileContent());
    }

    async updateDbState(urlProvider: IliasUrlProvider): Promise<void> {
        const repository = getRepository(Resource);

        // split `skip` to get a db resource and avoid querying db twice
        const dbResource = await repository.findOne({ saveTo: this.localFilePath });

        const newResource = this.createResource(urlProvider);

        if (dbResource) {
            repository.merge(dbResource, newResource);
            await repository.save(dbResource);
            return;
        }

        await repository.insert(newResource);
    }

    createResource(urlProvider: IliasUrlProvider): Resource {
        const targetLink = resolveLinkProvider(this.targetLink, urlProvider);

        return new Resource(
            'crs',
            new RootRefObject(this.refId, this.courseName),
            this.localFilePath,
            {
                hash: this.hashContent(),
                targetLink,
            }
        )
    }

    fileContent (): string {
        return stripMargin`${this.courseName}
            |${'='.repeat(this.courseName.length)}
            |refId: \`${this.refId}\`
            |
            |## Description
            |
            |${this.description || ''}
            |
            |
            |## Syllabus
            |
            |${this.syllabus || ''}
            |
            |
            |## Important information
            |
            |${this.importantInformation || ''}
            |`;
    }

    hashContent (): string {
        return createHash('sha256').update(this.fileContent()).digest('hex');
    }

}

// TODO move
/* https://gist.github.com/jimschubert/06fea56a6d2a1e7fdbc2#gistcomment-2591180 */
/**
 * Allows Scala-like stripMargin
 *
 * Parameters are applied implicitly via ES2015.
 *
 * @example
 * // returns "The Number is:\n    100\nThanks for playing!"
 * let num = 100
 * let result = stripMargin`The Number is:
 *         |    ${num}
 *         |Thanks for playing!`
 *
 */
function stripMargin(template: TemplateStringsArray, ...expressions: any[]): string {
    const result = template.reduce((accumulator, part, i) => {
        return accumulator + expressions[i - 1] + part;
    });

    return result.replace(/(\n|\r|\r\n)\s*\|/g, '$1');
}
