import { join } from 'path';
import * as filenamify from 'filenamify';

import {RefType} from '../soap/wsdl/ILIASSoapWebservice/xml/RefTreeXml';
import {RootRefObject} from '../../entities/Resource';
import {HasResourcesProvider} from './HasResourcesProvider';
import {flatMap} from '../../utils/Array';
import {RefObject} from '../../entities/RefObject';
import {getRepository} from 'typeorm';
import {ResourceProvider} from './ResourceProvider';

export abstract class IRef implements HasResourcesProvider {

    readonly children?: Array<IRef>;

    protected refObject: RefObject = undefined;

    protected constructor(
        readonly type: RefType,
        readonly refId: number,
        readonly name: string,
        readonly parent: IRef | undefined,
    ) {
        this.refId = refId;
        this.name = name;
        this.type = type;
        this.parent = parent;
    }

    get safePathName(): string {
        return filenamify(this.name);
    }

    get path(): string {
        const pathArray = [this.safePathName];

        let currentRef: IRef = this;
        while ( !! (currentRef = currentRef.parent)) {
            pathArray.unshift(currentRef.safePathName);
        }

        return join(...pathArray);
    }

    getRoot(): IRef {
        let currentRef: IRef = this;
        while (currentRef.parent)
            currentRef = currentRef.parent;

        return currentRef;
    }

    asRootRefObject(): RootRefObject {
        return new RootRefObject(this.refId, this.name);
    }

    async fetchOrCreateRefObject(): Promise<RefObject> {
        if (this.refObject)
            return this.refObject;

        const newRefObject = new RefObject(this.refId, this.type);
        const repository = getRepository(RefObject);

        if ( ! (this.refObject = await repository.findOne(newRefObject.id))) {
            await repository.insert(this.refObject = newRefObject);
        }
        return this.refObject;
    }

    getResourcesProvider(): Array<ResourceProvider> {
        return this.children?.length
            ? flatMap(this.children, ref => ref.getResourcesProvider())
            : [];
    }
}
