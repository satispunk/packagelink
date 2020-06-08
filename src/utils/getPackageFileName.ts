/* eslint-disable @typescript-eslint/no-explicit-any */
export default (packageJson: any): string => {
  /* eslint-enable @typescript-eslint/no-explicit-any */
  const {name: nameWithScope} = packageJson;
  let name = nameWithScope;
  let scope = '';
  if (name.includes('/')) {
    [scope, name] = nameWithScope.split('/');
    scope = scope.substr(1) + '-';
  }

  return `${scope}${name}.tgz`;
};
