import {ResourceProvider} from './ResourceProvider';

export interface HasResourcesProvider {
    getResourcesProvider(): Array<ResourceProvider>;
}
