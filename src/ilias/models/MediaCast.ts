import {IRef} from './IRef';
import {RefObjectXml} from '../soap/wsdl/ILIASSoapWebservice/xml/RefTreeXml';
import {HasResourcesProvider} from './HasResourcesProvider';
import {FileDownloadResource} from '../../fs/FileDownloadResource';
import {join} from 'path';
import {ObjectRefTreeScraper} from '../../controllers/ObjectRefTreeScraper';

export class MediaCast extends IRef implements HasResourcesProvider {

    readonly videoItems = new Array<VideoItem>();

    constructor(
        readonly refId: number,
        readonly name: string,
        readonly parent: IRef,
        readonly description?: string
    ) {
        super('mcst', refId, name, parent);
        this.parent.children.push(this);
    }

    static fromRefObject(object: RefObjectXml, parent: IRef) {
        const relatedReference = ObjectRefTreeScraper.selectRelatedReference(object.References, parent);
        return new MediaCast(
            parseInt(relatedReference.attributes.ref_id),
            object.Title,
            parent,
            object.Description
        )
    }


    getResourcesProvider(): Array<FileDownloadResource> {
        return this.videoItems.map(videoItem => videoItem.getResourceProvider());
    }
}

export class VideoItem {
    constructor(readonly filename: string, readonly downloadLink: URL, readonly mediaCast: MediaCast, readonly filesize: number = 0) {
        mediaCast.videoItems.push(this);
    }

    getResourceProvider(): FileDownloadResource {
        return new FileDownloadResource(
            "video",
            this.mediaCast.getRoot(),
            this.getSaveTo(),
            this.downloadLink.toString(),
            urlProvider => urlProvider.getGotoURL(this.mediaCast.type, this.mediaCast.refId),
            {
                fileSize: this.filesize
            }
        );
    }

    private getSaveTo() {
        return join(this.mediaCast.path, this.filename);
    }
}
