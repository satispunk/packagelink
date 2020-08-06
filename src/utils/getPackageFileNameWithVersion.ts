import getPackageFileName from './getPackageFileName';

export default ({name, version}: {name: string; version: string}): string => {
  let packageFileName = getPackageFileName(name);
  packageFileName = packageFileName.substr(0, packageFileName.length - 4);

  return `${packageFileName}-${version}.tgz`;
};
