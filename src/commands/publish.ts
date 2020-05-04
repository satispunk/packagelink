import path from 'path';
import fs from 'fs';
import os from 'os';
import child_process from 'child_process';
import chalk from 'chalk';
import validate from '../config/validate';
import {publishSchema} from '../config/schema';
import {Config} from '../config/Config';
import {Argv} from 'yargs';

const tmpdir = os.tmpdir();
const packagelinkDir = path.resolve(tmpdir, 'packagelink');

const command = 'publish';
const describe = 'Pack and publish to a temporary folder';
const builder = <T>(yargs): Argv<T> => {
  return yargs.check((argv) => {
    const {isValid, error} = validate(argv.config, publishSchema);
    if (!isValid) {
      throw new Error(chalk.red(error));
    }

    return true;
  });
};
const handler = (argv): void => {
  const config: Config = argv.config;
  if (!fs.existsSync(tmpdir)) {
    fs.mkdirSync(tmpdir);
  }

  if (!fs.existsSync(packagelinkDir)) {
    fs.mkdirSync(packagelinkDir);
  }

  process.chdir(packagelinkDir);

  const packages = config.publish.packages;

  child_process.execSync(`npm pack ${packages.join(' ')}`, {stdio: 'inherit'});

  console.log(`Packages packed to ${packagelinkDir}`);

  for (const packageFolder of packages) {
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(packageFolder, 'package.json')).toString());
    const {name, version} = packageJson;
    const packagePathWithVersion = path.resolve(packagelinkDir, `${name}-${version}.tgz`);
    const packagePath = path.resolve(packagelinkDir, `${name}.tgz`);
    fs.renameSync(packagePathWithVersion, packagePath);
  }
};

export {command, describe, handler, builder};
