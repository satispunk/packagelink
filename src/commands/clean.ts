import * as path from 'path';
import * as os from 'os';
import {deleteFolderRecursive} from '../utils/deleteFolderRecursive';

const tmpdir = os.tmpdir();
const packagelinkDir = path.resolve(tmpdir, 'packagelink');

const command = 'clean';
const describe = 'Clean temporary folder from all linked packages';
const handler = (): void => {
  deleteFolderRecursive(packagelinkDir);
};

export {command, describe, handler};
