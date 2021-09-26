import {IRef} from './IRef';
import {CourseXmlObject} from '../soap/wsdl/ILIASSoapWebservice/xml/CourseXml';
import {ResourceProvider} from './ResourceProvider';
import {CourseDescriptionResource} from '../../fs/CourseDescriptionResource';

export class Course extends IRef {

    readonly children = new Array<IRef>();

    constructor (
        refId: number,
        name: string,
        readonly description?: string,
        readonly syllabus?: string,
        readonly importantInformation?: string,
    ) {
        super('crs', refId, name, undefined);
    }

    static fromXmlCourseObjext(refId: number, course: CourseXmlObject) {
        return new Course(
            refId,
            course.MetaData.General.Title.$value,
            course.MetaData.General.Description.$value,
            course.Settings.Syllabus,
            course.Settings.ImportantInformation,
        );
    }


    getResourcesProvider(): Array<ResourceProvider> {
        const courseDescriptionResource = new CourseDescriptionResource(
            this.refId,
            this.name,
            this.safePathName,
            urlProvider => urlProvider.getGotoURL(this.type, this.refId),
            this.description,
            this.syllabus,
            this.importantInformation
        );
        return [courseDescriptionResource, ...super.getResourcesProvider()];
    }
}
