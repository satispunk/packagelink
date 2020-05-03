#!/usr/bin/env node
import yargs from 'yargs';

import * as publish from './commands/publish';
import * as install from './commands/install';
import * as clean from './commands/clean';
import path from "path";
import chalk from "chalk";

const cwd = process.cwd();

yargs
  .option('config', {
    alias: 'c',
    default: 'packagelink.config.js',
    describe: 'packagelink config file',
    type: 'string'
  })
  .coerce('config', (configPath) => {
    let rawConfig;
    try {
      rawConfig = require(path.join(cwd, configPath));
    } catch {
      console.error(chalk.red(`packagelink.config.js is missing or cannot be parsed in "${cwd}".`));
      process.exit(1);
    }

    return rawConfig;
  })
  .command(publish)
  .command(install)
  .command(clean)
  .demandCommand(1, 'Command must be provided.')
  .help()
  .argv;
