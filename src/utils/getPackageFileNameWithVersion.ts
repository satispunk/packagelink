import getPackageFileName from './getPackageFileName';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default (packageJson: any): string => {
  /* eslint-enable @typescript-eslint/no-explicit-any */
  const {version} = packageJson;
  let packageFileName = getPackageFileName(packageJson);
  packageFileName = packageFileName.substr(0, packageFileName.length - 4);

  return `${packageFileName}-${version}.tgz`;
};
