import {IRef} from './IRef';
import {HasResourcesProvider} from './HasResourcesProvider';
import {getPropertyNamed} from '../../utils/XmlProperty';
import {References, RefObjectXml} from '../soap/wsdl/ILIASSoapWebservice/xml/RefTreeXml';
import {ResourceProvider} from './ResourceProvider';
import {FileDownloadResource} from '../../fs/FileDownloadResource';
import {ObjectRefTreeScraper} from '../../controllers/ObjectRefTreeScraper';

export class File extends IRef implements HasResourcesProvider {

    constructor(
        readonly refId: number,
        readonly parent: IRef,
        readonly name: string,
        readonly createdAt: string, // fixme: YYYY-MM-DD HH:mm:ss
        readonly updatedAt: string, // fixme: YYYY-MM-DD HH:mm:ss
        readonly fileSize: number,
        readonly fileExtension: string,
        readonly fileVersion: number,
        readonly description?: string,
    ) {
        super('file', refId, name, parent);
        this.parent.children.push(this);
    }

    static fromRefObject(object: RefObjectXml, parent: IRef): File {
        const objectProperties = object.Properties.Property;
        const fileSize = parseInt(getPropertyNamed('fileSize', objectProperties));
        const fileExtension = getPropertyNamed('fileExtension', objectProperties);
        const fileVersion = parseInt(getPropertyNamed('fileVersion', objectProperties));

        const relatedReference = ObjectRefTreeScraper.selectRelatedReference(object.References, parent);
        const ref_id = relatedReference.attributes.ref_id;

        return new File(
            parseInt(ref_id),
            parent,
            object.Title,
            object.CreateDate,
            object.LastUpdate,
            fileSize,
            fileExtension,
            fileVersion
        );
    }

    getResourcesProvider(): Array<ResourceProvider> {
        return [new FileDownloadResource(
            this.type,
            this.getRoot(),
            this.path,
            urlProvider => urlProvider.getDownloadURL(this.type, this.refId),
            urlProvider => urlProvider.getGotoURL(this.type, this.refId),
            {
                fileSize: this.fileSize,
                fileVersion: this.fileVersion
            }
        )];
    }
}
