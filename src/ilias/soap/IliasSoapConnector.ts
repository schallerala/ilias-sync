import {IConnectorLogger} from '../../requests/logger/IConnectorLogger';
import {NoopLogger} from '../../requests/logger/NoopLogger';
import {IILIASSoapWebservicePortSoap} from './wsdl/ILIASSoapWebservice/ILIASSoapWebservicePort';
import {WSDL} from 'soap';
import * as soap from 'soap';
import {createXmlResultSet, extractResultSetRows, extractValue} from './wsdl/ILIASSoapWebservice/XmlObjects';
import {IliasUrlProvider} from '../IliasUrlProvider';
import {LoggingSoapClient} from './LoggingSoapClient';
import {ObjectRefTreeScraper} from '../../controllers/ObjectRefTreeScraper';
import {Course} from '../models/Course';
import {IRef} from '../models/IRef';
import {ResultSetRoot} from './wsdl/ILIASSoapWebservice/xml/ResultSetXml';
import {CourseResultSetRow, CourseXmlObjectRoot} from './wsdl/ILIASSoapWebservice/xml/CourseXml';
import {RefTreeRoot} from './wsdl/ILIASSoapWebservice/xml/RefTreeXml';

export class IliasSoapConnector {

    readonly wsdlClient: WSDL;

    constructor(
        private readonly sessionToken: string,
        private readonly clientName: string,
        private readonly soapClient: IILIASSoapWebservicePortSoap,
        private readonly urlProvider: IliasUrlProvider,
        private readonly logger: IConnectorLogger = new NoopLogger()) {
        this.wsdlClient = soapClient['wsdl'];
        new LoggingSoapClient(soapClient, logger);
    }

    public static async createConnector (
        sessionToken: string,
        clientName: string,
        urlProvider: IliasUrlProvider,
        logger: IConnectorLogger = new NoopLogger()
    ) {
        const soapClient = <IILIASSoapWebservicePortSoap> await soap.createClientAsync(urlProvider.getWsdlUrl().toString());
        return new IliasSoapConnector(sessionToken, clientName, soapClient, urlProvider, logger);
    }

    get sid(): string {
        return `${this.sessionToken}::${this.clientName}`;
    }

    async getLoggedUserRefId (): Promise<number> {
        const soapAnswer = await this.soapClient.getUserIdBySidAsync({
            sid: this.sid
        });

        const [ { usr_id } ] = soapAnswer;
        return extractValue(usr_id);
    }

    async getUserCourses (user_id: number): Promise<Array<Course>> {
        const parameters = createXmlResultSet([{ user_id, status: 7 }], this.wsdlClient, [ 'status', 'user_id' ]);

        const soapAnswer = await this.soapClient.getCoursesForUserAsync({
            sid: this.sid,
            parameters
        });

        const [ { xml } ] = soapAnswer;
        const coursesXmlResultSet: ResultSetRoot = this.wsdlClient.xmlToObject(extractValue(xml));
        const courseResultSetRows = extractResultSetRows(coursesXmlResultSet) as Array<CourseResultSetRow>;

        return courseResultSetRows.map(({ ref_id, xml }) => {
            const courseDetails: CourseXmlObjectRoot = this.wsdlClient.xmlToObject(xml);
            return Course.fromXmlCourseObjext(ref_id, courseDetails.Course);
        });
    }

    async getRefTree(root: IRef): Promise<ObjectRefTreeScraper> {
        const soapAnswer = await this.soapClient.getTreeChildsAsync({
            sid: this.sid,
            ref_id: root.refId
        });

        const [ { object_xml } ] = soapAnswer;
        const refTree: RefTreeRoot = this.wsdlClient.xmlToObject(extractValue(object_xml));

        return new ObjectRefTreeScraper(root, refTree);
    }

}
