import getPackageFileNameWithVersion from '../../src/utils/getPackageFileNameWithVersion';

describe('getPackageFileNameWithVersion', () => {
  it('should return name for regular package', () => {
    const packageJson = {
      name: 'no-scope-package-name',
      version: '1.3.6',
    };
    const packageFileName = getPackageFileNameWithVersion(packageJson);

    expect(packageFileName).toBe('no-scope-package-name-1.3.6.tgz');
  });

  it('should return name for scoped package', () => {
    const packageJson = {
      name: '@scope/package-name',
      version: '1.2.1',
    };
    const packageFileName = getPackageFileNameWithVersion(packageJson);

    expect(packageFileName).toBe('scope-package-name-1.2.1.tgz');
  });
});
