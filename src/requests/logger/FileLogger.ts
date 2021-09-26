import {IConnectorLogger} from './IConnectorLogger';
import * as winston from 'winston';

export class FileLogger implements IConnectorLogger {

    private readonly soapLogger: winston.Logger;
    private readonly htmlLogger: winston.Logger;

    constructor(soapResponseFile: string = './soapResponse.log', htmlResponseFile: string = './htmlResponse.log') {
        this.soapLogger = winston.createLogger({
            level: 'info',
            format: winston.format.simple(),
            transports: [
                new winston.transports.File({ filename: soapResponseFile }),
                new winston.transports.Console({ level: 'error' }),
            ],
        });
        this.htmlLogger = winston.createLogger({
            level: 'info',
            format: winston.format.simple(),
            transports: [
                new winston.transports.File({ filename: htmlResponseFile }),
                new winston.transports.Console({ level: 'error' }),
            ],
        });
    }

    // TODO individual files
    logResponse(method: string, url: string, responseBody: string): void {
        this.htmlLogger.info('=============================================================');
        this.htmlLogger.info(`${method}\t${url}`);
        this.htmlLogger.info(responseBody);
    }

    logSoap(action: string, envelop: any, response: any): void {
        this.soapLogger.info(`SOAP\t${action}`);
        this.soapLogger.info(JSON.stringify(envelop));
        this.soapLogger.info(JSON.stringify(response));
    }

    logSoapError(action: string, envelop: any, error: any): void {
        this.soapLogger.error(`SOAP\t${action}`);
        this.soapLogger.error(JSON.stringify(envelop));
        this.soapLogger.error(JSON.stringify(error));
    }

}
