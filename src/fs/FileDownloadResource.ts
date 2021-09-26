import {ResourceProvider} from '../ilias/models/ResourceProvider';
import {IliasUrlProvider, LinkProvider, resolveLinkProvider} from '../ilias/IliasUrlProvider';
import {Resource, ResourceOptions, ResourceType, RootRefObject} from '../entities/Resource';
import {CookieJar} from 'tough-cookie';
import {IRef} from '../ilias/models/IRef';
import {createNecessaryFolders} from './persisterHelpers';
import {promisify} from 'util';
import * as stream from 'stream';
import got from 'got';
import {createWriteStream, existsSync, statSync} from 'fs';
import {getRepository} from 'typeorm';

const pipeline = promisify(stream.pipeline);

export class FileDownloadResource implements ResourceProvider {

    constructor(
        readonly type: ResourceType,
        readonly rootRef: IRef,
        readonly localFilePath: string,
        readonly downloadLink?: LinkProvider,
        readonly targetLink?: LinkProvider,
        readonly resourceOptions: Omit<ResourceOptions, 'downloadLink' | 'targetLink'> = {}
    ) {
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

            if ((this.resourceOptions.fileVersion || 0) < dbResource.fileVersion) {
                console.warn(`New version of file (${this.resourceOptions.fileVersion} vs ${dbResource.fileVersion}): ${this.localFilePath}`);
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
        const downloadLink = resolveLinkProvider(this.downloadLink, urlProvider);

        await createNecessaryFolders(this.localFilePath);

        // TODO
        //      await got('https://sindresorhus.com')
        //          .on('downloadProgress', progress => {
        //              // Report download progress
        //          })

        console.log(`downloading: ${downloadLink} to ${this.localFilePath}`);
        await pipeline(
            got.stream(downloadLink, {
                cookieJar
            }),
            createWriteStream(this.localFilePath)
        );
        console.log(`Saved at ${this.localFilePath}`);
    }

    async updateDbState (urlProvider: IliasUrlProvider): Promise<void> {
        const repository = getRepository(Resource);

        const downloadLink = resolveLinkProvider(this.downloadLink, urlProvider);

        // split `skip` to get a db resource and avoid querying db twice
        const dbResource = await repository.findOne({
            where: [
                // saveTo or downloadLink
                { saveTo: this.localFilePath },
                { downloadLink },
            ]
        });

        const newResource = this.createResource(urlProvider);

        if (dbResource) {
            repository.merge(dbResource, newResource);
            await repository.save(dbResource);
            return;
        }

        await repository.insert(newResource);
    }

    createResource(urlProvider: IliasUrlProvider): Resource {
        const downloadLink = resolveLinkProvider(this.downloadLink, urlProvider);
        const targetLink = resolveLinkProvider(this.targetLink, urlProvider);

        return new Resource(
            this.type,
            new RootRefObject(this.rootRef.refId, this.rootRef.name),
            this.localFilePath,
            {
                ...this.resourceOptions,
                downloadLink, targetLink,
            }
        )
    }
}
