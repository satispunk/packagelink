export default (nameWithScope: string): string => {
  let name = nameWithScope;
  let scope = '';
  if (name.includes('/')) {
    [scope, name] = nameWithScope.split('/');
    scope = scope.substr(1) + '-';
  }

  return `${scope}${name}.tgz`;
};
