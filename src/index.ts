#!/usr/bin/env node

import yargs = require('yargs/yargs');

yargs(process.argv.slice(2))
    // https://github.com/yargs/yargs/blob/master/docs/advanced.md#example-command-hierarchy-using-commanddir
    .commandDir('commands', {
        extensions: process.env.NODE_ENV === 'production' ? ['js'] : ['js', 'ts'],
    })
    .demandCommand()
    .argv;
