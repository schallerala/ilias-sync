import {IRef} from './IRef';
import {RefObjectXml} from '../soap/wsdl/ILIASSoapWebservice/xml/RefTreeXml';
import {ObjectRefTreeScraper} from '../../controllers/ObjectRefTreeScraper';

export class Folder extends IRef {

    readonly children = new Array<IRef>();

    constructor (
        readonly refId: number,
        readonly name: string,
        readonly parent: IRef,
        readonly description?: string
    ) {
        super('fold', refId, name, parent);
        this.parent.children.push(this);
    }

    static fromRefObject(object: RefObjectXml, parent: IRef) {
        const relatedReference = ObjectRefTreeScraper.selectRelatedReference(object.References, parent);
        return new Folder(
            parseInt(relatedReference.attributes.ref_id),
            object.Title,
            parent,
            object.Description
        )
    }
}
