import getPackageFileName from '../../src/utils/getPackageFileName';

describe('getPackageFileNameWithVersion', () => {
  it('should return name for regular package', () => {
    const packageName = 'no-scope-package-name';
    const packageFileName = getPackageFileName(packageName);

    expect(packageFileName).toBe('no-scope-package-name.tgz');
  });

  it('should return name for scoped package', () => {
    const packageName = '@scope/package-name';
    const packageFileName = getPackageFileName(packageName);

    expect(packageFileName).toBe('scope-package-name.tgz');
  });
});
