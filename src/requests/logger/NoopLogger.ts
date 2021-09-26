import {IConnectorLogger} from './IConnectorLogger';

export class NoopLogger implements IConnectorLogger {
    logResponse(method: string, url: string, responseBody: string): void {}

    logSoap(action: string, envelop: any, response: any): void {}
    logSoapError(action: string, envelop: any, error: any): void {}
}
