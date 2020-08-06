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
import getPackageFileName from '../utils/getPackageFileName';

const cwd = process.cwd();
const tmpdir = os.tmpdir();
const packagelinkDir = path.resolve(tmpdir, 'packagelink');

enum DependencyTypes {
  prod = '--save-prod',
  dev = '--save-dev',
}

const install = ({packages, dependencyType}: {packages: string[]; dependencyType: DependencyTypes}): void => {
  if (packages.length === 0) return;

  const packageList = packages.reduce((packageList, nextPackage) => {
    const packagePath = path.join(cwd, `${getPackageFileName(nextPackage)}.tgz`);
    if (fs.existsSync(packagePath)) {
      packageList += ' ' + packagePath;
    }
    return packageList;
  }, '');

  const installCmd = `npm install ${dependencyType} ${packageList}`;
  child_process.execSync(installCmd, {stdio: 'inherit'});
};

const command = 'install [packageName]';
const describe = 'Install packages from a temporary folder';
const builder = <T>(yargs): Argv<T> => {
  return yargs
    .positional('packageName', {
      describe: 'Package name to install',
      type: 'string',
    })
    .option('save-dev', {
      alias: 'dev',
      type: 'boolean',
      default: false,
      describe: 'Install as devDependency',
    })
    .check((argv) => {
      const {isValid, error} = validate(argv.config, installSchema);
      if (!isValid) {
        throw new Error(chalk.red(error));
      }

      return true;
    });
};
const handler = (argv): void => {
  const packageName: string = argv.packageName;
  const saveDev: boolean = argv.saveDev;
  const config: Config = argv.config;

  const dependencies: string[] = [];
  const devDependencies: string[] = [];
  if (packageName) {
    if (saveDev) {
      devDependencies.push(packageName);
    } else {
      dependencies.push(packageName);
    }
  } else {
    dependencies.push(...config.install.dependencies);
    devDependencies.push(...config.install.devDependencies);
  }

  for (const packageName of [...dependencies, ...devDependencies]) {
    const packageFolder = path.resolve(cwd, 'node_modules', packageName);
    deleteFolderRecursive(packageFolder);

    const packageFileName = getPackageFileName(packageName);
    const srcPackagePath = path.resolve(packagelinkDir, `${packageFileName}.tgz`);
    const destPackagePath = path.resolve(cwd, `${packageFileName}.tgz`);
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
