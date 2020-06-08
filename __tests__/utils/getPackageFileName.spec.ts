import getPackageFileName from '../../src/utils/getPackageFileName';

describe('getPackageFileNameWithVersion', () => {
  it('should return name for regular package', () => {
    const packageJson = {
      name: 'no-scope-package-name',
    };
    const packageFileName = getPackageFileName(packageJson);

    expect(packageFileName).toBe('no-scope-package-name.tgz');
  });

  it('should return name for scoped package', () => {
    const packageJson = {
      name: '@scope/package-name',
    };
    const packageFileName = getPackageFileName(packageJson);

    expect(packageFileName).toBe('scope-package-name.tgz');
  });
});
