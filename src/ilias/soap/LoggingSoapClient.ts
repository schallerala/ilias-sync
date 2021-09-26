import {IConnectorLogger} from '../../requests/logger/IConnectorLogger';
import {NoopLogger} from '../../requests/logger/NoopLogger';
import {IILIASSoapWebservicePortSoap} from './wsdl/ILIASSoapWebservice/ILIASSoapWebservicePort';

export class LoggingSoapClient {
    constructor(
        readonly soapClient: IILIASSoapWebservicePortSoap,
        readonly logger: IConnectorLogger = new NoopLogger()
    ) {
        this.wrapClientWithLogger();
    }

    private wrapClientWithLogger() {
        const description = this.soapClient.describe();
        for (const serviceName of Object.getOwnPropertyNames(description)) {
            const service = description[serviceName];
            for (const portName of Object.getOwnPropertyNames(service)) {
                const port = service[portName];
                for (const methodName of Object.getOwnPropertyNames(port)) {
                    this.soapClient[methodName] = this.createCallbackWrappedMethodWithLogger(methodName);

                    // believing that the promise like methods where configured with the
                    // 'Async' suffix
                    const asyncMethodName = `${methodName}Async`;
                    this.soapClient[asyncMethodName] = this.createPromiseWrappedMethodWithLogger(asyncMethodName);
                }
            }
        }
    }

    private createCallbackWrappedMethodWithLogger (methodName: string): CallbackMethod {
        // callback style method signature:
        //      (
        //          input: Partial<IloginInput>,
        //          cb: (
        //              err: any | null,
        //              result: IloginOutput,
        //              rawResult: string,
        //              soapHeader: {[k: string]: any; },
        //              rawRequest: string
        //          ) => any,
        //          options?: any,
        //          extraHeaders?: any
        //      ) => void;

        const initialMethod = this.soapClient[methodName];

        return (
            input: Partial<any>,
            cb: (err: any | null, result: any, rawResult: string, soapHeader: {[k: string]: any; }, rawRequest: string) => any,
            options?: any,
            extraHeaders?: any
        ) => {
            initialMethod(
                input,
                (err: any | null, result: any, rawResult: string, soapHeader: {[k: string]: any; }, rawRequest: string): any => {
                    this.logger.logSoap(methodName, input, result);
                    // TODO check usage of this, if this wrapper alters its behavior
                    cb(err, result, rawResult, soapHeader, rawRequest);
                },
                options,
                extraHeaders);
        }
    }

    private createPromiseWrappedMethodWithLogger(asyncMethodName: string): PromiseMethod {
        // promise method signature:
        //      (
        //          input: Partial<IloginInput>,
        //          options?: any,
        //          extraHeaders?: any
        //      ) => Promise<[
        //                  IloginOutput,
        //                  string,
        //                  {[k: string]: any; },
        //                  string
        //           ]>

        const initialMethod = this.soapClient[asyncMethodName];

        return async (input: Partial<any>, options?: any, extraHeaders?: any): PromiseArrayReturn => {
            const soapAnswer = await initialMethod(input, options, extraHeaders);
            this.logger.logSoap(asyncMethodName, input, soapAnswer[0]);
            return soapAnswer;
        }
    }
}


type CallbackMethod = (input: Partial<any>, cb: (err: any | null, result: any, rawResult: string, soapHeader: {[k: string]: any; }, rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
type PromiseArrayReturn = Promise<[any, string, {[k: string]: any; }, string]>;
type PromiseMethod = (input: Partial<any>, options?: any, extraHeaders?: any) => PromiseArrayReturn;
