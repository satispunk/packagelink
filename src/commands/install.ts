import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as child_process from 'child_process';
import {deleteFolderRecursive} from '../utils/deleteFolderRecursive';
import validate from '../config/validate';
import {installSchema} from '../config/schema';
import chalk from 'chalk';

const cwd = process.cwd();
const tmpdir = os.tmpdir();
const packagelinkDir = path.resolve(tmpdir, 'packagelink');

const install = ({packages, dependencyType}): void => {
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
const handler = (argv): void => {
  const {isValid, config, error} = validate(argv.config, installSchema);
  console.log(isValid);
  if (!isValid) {
    console.error(chalk.red(error));
    process.exit(1);
  }

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

  const DependencyTypes = {
    regular: '--save',
    dev: '--save-dev',
  };

  install({
    packages: dependencies,
    dependencyType: DependencyTypes.regular,
  });
  install({
    packages: devDependencies,
    dependencyType: DependencyTypes.dev,
  });
};

export {command, describe, handler};
