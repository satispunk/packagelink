#!/usr/bin/env node
import yargs from 'yargs';

import * as publish from './commands/publish';
import * as install from './commands/install';
import * as clean from './commands/clean';
import path from 'path';

const cwd = process.cwd();

yargs
  .usage('Usage: $0 <command> [options]')
  .option('config', {
    alias: 'c',
    default: 'packagelink.config.js',
    describe: 'packagelink config file',
    type: 'string',
  })
  .coerce('config', (configPath) => {
    let rawConfig;
    try {
      rawConfig = require(path.join(cwd, configPath));
    } catch {
      return {
        publish: {
          packages: [],
        },
        install: {
          dependencies: [],
          devDependencies: [],
        },
      };
    }

    return rawConfig;
  })
  .command(publish)
  .command(install)
  .command(clean)
  .demandCommand(1, 'Command must be provided.')
  .showHelpOnFail(false)
  .help().argv;
