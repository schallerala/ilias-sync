import {IRef} from './IRef';
import {Assignment} from './Assignment';
import {RefObjectXml} from '../soap/wsdl/ILIASSoapWebservice/xml/RefTreeXml';
import {HasResourcesProvider} from './HasResourcesProvider';
import {flatMap} from '../../utils/Array';
import {ResourceProvider} from './ResourceProvider';
import {ObjectRefTreeScraper} from '../../controllers/ObjectRefTreeScraper';

export class Exercise extends IRef implements HasResourcesProvider {

    readonly assignments = new Array<Assignment>();

    constructor(refId: number, name: string, parent: IRef) {
        super('exc', refId, name, parent);
        this.parent.children.push(this);
    }

    static fromRefObject(object: RefObjectXml, parent: IRef): Exercise {
        const relatedReference = ObjectRefTreeScraper.selectRelatedReference(object.References, parent);
        return new Exercise(
            parseInt(relatedReference.attributes.ref_id),
            object.Title,
            parent
        );
    }

    getResourcesProvider(): Array<ResourceProvider> {
        return flatMap(this.assignments, assignment => assignment.getResourcesProvider());
    }
}
