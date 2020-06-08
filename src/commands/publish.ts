import path from 'path';
import fs from 'fs';
import os from 'os';
import child_process from 'child_process';
import chalk from 'chalk';
import validate from '../config/validate';
import {publishSchema} from '../config/schema';
import {Config} from '../config/Config';
import {Argv} from 'yargs';
import getPackageFileNameWithVersion from '../utils/getPackageFileNameWithVersion';
import getPackageFileName from '../utils/getPackageFileName';

const tmpdir = os.tmpdir();
const packagePath = process.cwd();
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

  /* No packages specified in config, then publish package from cwd */
  const packages = config.publish.packages.length > 0 ? config.publish.packages : [packagePath];

  child_process.execSync(`npm pack ${packages.join(' ')}`, {stdio: 'inherit', cwd: packagelinkDir});

  console.log(`Packages packed to ${packagelinkDir}`);

  for (const packageFolder of packages) {
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(packageFolder, 'package.json')).toString());
    const packagePathWithVersion = path.resolve(packagelinkDir, getPackageFileNameWithVersion(packageJson));
    const packagePath = path.resolve(packagelinkDir, getPackageFileName(packageJson));
    fs.renameSync(packagePathWithVersion, packagePath);
  }
};

export {command, describe, handler, builder};
