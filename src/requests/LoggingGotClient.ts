import {IConnectorLogger} from './logger/IConnectorLogger';
import {NoopLogger} from './logger/NoopLogger';
import got, {Got} from 'got';
import {Response} from 'got/dist/source/core';
import {CancelableRequest} from 'got/dist/source/as-promise/types';

export class LoggingGotClient {

    private readonly gotClient: Got;

    constructor(gotClient: Got, readonly logger: IConnectorLogger) {
        this.gotClient = gotClient.extend({
            hooks: {
                afterResponse: [
                    (response: Response): Response | CancelableRequest<Response> | Promise<Response | CancelableRequest<Response>> => {
                        // avoid logging the request body, as it may contain the user email and password
                        const { url, request: { options: { method } }, body } = response;
                        logger.logResponse(method, url, body.toString());
                        return response;
                    }
                ]
            }
        });
    }

    static createLoggingGotClient (gotClient: Got = got, logger: IConnectorLogger = new NoopLogger()): Got {
        return new LoggingGotClient(gotClient, logger).gotClient;
    }
}
