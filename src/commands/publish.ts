import path from 'path';
import fs from 'fs';
import os from 'os';
import child_process from 'child_process';
import chalk from 'chalk';
import validate from "../config/validate";
import {publishSchema} from "../config/schema";

const tmpdir = os.tmpdir();
const packagelinkDir = path.resolve(tmpdir, 'packagelink');

const command = 'publish';
const describe = 'Pack and publish to a temporary folder';
const handler = (argv) => {
  if (!fs.existsSync(tmpdir)) {
    fs.mkdirSync(tmpdir);
  }

  if (!fs.existsSync(packagelinkDir)) {
    fs.mkdirSync(packagelinkDir);
  }

  process.chdir(packagelinkDir);

  const {isValid, config, error} = validate(argv.config, publishSchema);
  if (!isValid) {
    console.error(chalk.red(error));
    process.exit(1)
  }

  const packages = config.publish.packages;

  child_process.execSync(`npm pack ${packages.join(' ')}`, {stdio: 'inherit'});

  console.log(`Packages packed to ${packagelinkDir}`);

  for (const packageFolder of packages) {
    const packageJson = require(path.resolve(packageFolder, 'package.json'));
    const {name, version} = packageJson;
    const packagePathWithVersion = path.resolve(packagelinkDir, `${name}-${version}.tgz`);
    const packagePath = path.resolve(packagelinkDir, `${name}.tgz`);
    fs.renameSync(packagePathWithVersion, packagePath);
  }
}

export {
  command,
  describe,
  handler
}