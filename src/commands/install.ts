import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as child_process from 'child_process';
import {deleteFolderRecursive} from '../utils/deleteFolderRecursive';
import validate from '../config/validate';
import {installSchema} from '../config/schema';
import chalk from 'chalk';
import {Config} from '../config/Config';
import {Argv} from 'yargs';

const cwd = process.cwd();
const tmpdir = os.tmpdir();
const packagelinkDir = path.resolve(tmpdir, 'packagelink');

enum DependencyTypes {
  prod = '--save',
  dev = '--save-dev',
}

const install = ({packages, dependencyType}: {packages: string[]; dependencyType: DependencyTypes}): void => {
  const packageList = packages.reduce((packageList, nextPackage) => {
    const packagePath = path.join(cwd, `${nextPackage}.tgz`);
    if (fs.existsSync(packagePath)) {
      packageList += ' ' + packagePath;
    }
    return packageList;
  }, '');

  const installCmd = `npm install ${dependencyType} ${packageList}`;
  child_process.execSync(installCmd, {stdio: 'inherit'});
};

const command = 'install';
const describe = 'Install packages from a temporary folder';
const builder = <T>(yargs): Argv<T> => {
  return yargs.check((argv) => {
    const {isValid, error} = validate(argv.config, installSchema);
    if (!isValid) {
      throw new Error(chalk.red(error));
    }

    return true;
  });
};
const handler = (argv): void => {
  const config: Config = argv.config;
  const dependencies = config.install.dependencies;
  const devDependencies = config.install.devDependencies;

  for (const packageName of [...dependencies, ...devDependencies]) {
    const packageFolder = path.resolve(cwd, 'node_modules', packageName);
    deleteFolderRecursive(packageFolder);

    const srcPackagePath = path.resolve(packagelinkDir, `${packageName}.tgz`);
    const destPackagePath = path.resolve(cwd, `${packageName}.tgz`);
    if (fs.existsSync(srcPackagePath)) {
      fs.copyFileSync(srcPackagePath, destPackagePath);
    }
  }

  install({
    packages: dependencies,
    dependencyType: DependencyTypes.prod,
  });
  install({
    packages: devDependencies,
    dependencyType: DependencyTypes.dev,
  });
};

export {command, describe, handler, builder};
