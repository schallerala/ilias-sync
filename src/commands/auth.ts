import { Arguments, Argv, CommandBuilder } from 'yargs';
import {Authenticator} from '../controllers/Authenticator';
import {DlCookieJar} from '../requests/cookies/DlCookieJar';
import {IliasUrlProvider} from '../ilias/IliasUrlProvider';
import {unlinkSync} from 'fs';
const prompts = require('prompts');

interface AuthOption {
    username?: string,
    password?: string,
    sync: boolean
}

export const command = 'auth [--username pierre@pierrafeu.org]'
export const describe = 'Authenticate the user on Ilias Bern using the SSO of UNIFR. ' +
    'This means log in with the SSO EDU-ID Switch'
export const builder: CommandBuilder = function authBuilder (yargs: Argv<AuthOption>) {
    return yargs.options({
        username: {
            alias: ['user', 'u'],
            describe: 'The username to connect to the SSO of UNIFR (for now)',
            type: 'string',
            demandOption: false
        },
        password: {
            hidden: true,
            alias: 'p',
            describe: 'The password of the user to connect with, can also be asked later',
            type: 'string',
            demandOption: false,
            coerce: args => {
                console.error('Avoid using the password option. It is asked later too');
                return args;
            }
        },
        // sync: {
        //     describe: 'Sync after authenticate on Ilias',
        //     boolean: true
        // }
    })
}

export const handler = async function authHandler (args: Arguments<AuthOption>) {
    prompts.override(args);

    const { username, password } = await prompts([
        {
            type: 'text',
            name: 'username',
            message: 'What is your UNIFR email?'
        },
        {
            type: 'invisible',
            name: 'password',
            message: 'What is your password on Switch EDU-ID?'
        }
    ]);

    // TODO could be improved?
    unlinkSync(DlCookieJar.defaultCookiesFilePath);

    const cookieJar = new DlCookieJar();

    const authenticate = new Authenticator(username, password, IliasUrlProvider.getUniBernUrlProvider(), cookieJar);
    await authenticate.authenticate();

    await cookieJar.saveStore();

    if (args.sync) {
        throw new Error("TODO");
        // const scrapCourses = new ScrapCourses(cookieJar);
        // await scrapCourses.getClassesLink();
    }
}
