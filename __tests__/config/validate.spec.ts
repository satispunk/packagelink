import validate from '../../src/config/validate';
import {publishSchema, installSchema} from '../../src/config/schema';

describe('validate', () => {
  describe('publish schema', () => {
    it('should be valid if have no "publish" property', () => {
      const config = {};
      const {isValid, error} = validate(config, publishSchema);
      expect(isValid).toBeTruthy();
      expect(error).toBeUndefined();
    });

    it('should not be valid if have no "publish.packages" property', () => {
      const config = {
        publish: {},
      };
      const {isValid, error} = validate(config, publishSchema);
      expect(isValid).toBeFalsy();
      expect(error).toBe(`[packagelink.config].publish should have required property 'packages'`);
    });

    it('should not be valid if "publish.packages" is not array', () => {
      const config = {
        publish: {
          packages: 2,
        },
      };
      const {isValid, error} = validate(config, publishSchema);
      expect(isValid).toBeFalsy();
      expect(error).toBe(`[packagelink.config].publish.packages should be array`);
    });

    it('should not be valid if "publish.packages" is not array of strings', () => {
      const config = {
        publish: {
          packages: [2, 3],
        },
      };
      const {isValid, error} = validate(config, publishSchema);
      expect(isValid).toBeFalsy();
      expect(error).toBe(`[packagelink.config].publish.packages[0] should be string
[packagelink.config].publish.packages[1] should be string`);
    });

    it('should not be valid if "publish.packages" is not array of unique strings', () => {
      const config = {
        publish: {
          packages: ['a', 'b', 'a'],
        },
      };
      const {isValid, error} = validate(config, publishSchema);
      expect(isValid).toBeFalsy();
      expect(error).toBe(
        `[packagelink.config].publish.packages should NOT have duplicate items (items ## 2 and 0 are identical)`
      );
    });

    it('should be valid', () => {
      const config = {
        publish: {
          packages: ['a', 'b'],
        },
      };
      const {isValid, error} = validate(config, publishSchema);
      expect(isValid).toBeTruthy();
      expect(error).toBeUndefined();
    });

    it('should be valid if "install" property in use', () => {
      const config = {
        publish: {
          packages: ['a', 'b'],
        },
        install: {
          dependencies: ['a', 'b'],
          devDependencies: ['c', 'd'],
        },
      };
      const {isValid, error} = validate(config, publishSchema);
      expect(isValid).toBeTruthy();
      expect(error).toBeUndefined();
    });
  });

  describe('install schema', () => {
    it('should be valid if have no "install" property', () => {
      const config = {};
      const {isValid, error} = validate(config, installSchema);
      expect(isValid).toBeTruthy();
      expect(error).toBeUndefined();
    });

    it('should be valid if have no "dependencies" or "devDependencies" property', () => {
      const config = {
        install: {},
      };
      const {isValid, error} = validate(config, installSchema);
      expect(isValid).toBeTruthy();
      expect(error).toBeUndefined();
    });

    it('should not be valid if "install.dependencies" is not array', () => {
      const config = {
        install: {
          dependencies: 2,
        },
      };
      const {isValid, error} = validate(config, installSchema);
      expect(isValid).toBeFalsy();
      expect(error).toBe(`[packagelink.config].install.dependencies should be array`);
    });

    it('should not be valid if "install.devDependencies" is not array', () => {
      const config = {
        install: {
          devDependencies: 2,
        },
      };
      const {isValid, error} = validate(config, installSchema);
      expect(isValid).toBeFalsy();
      expect(error).toBe(`[packagelink.config].install.devDependencies should be array`);
    });

    it('should not be valid if "install.dependencies" is not array of strings', () => {
      const config = {
        install: {
          dependencies: [2, 3],
        },
      };
      const {isValid, error} = validate(config, installSchema);
      expect(isValid).toBeFalsy();
      expect(error).toBe(`[packagelink.config].install.dependencies[0] should be string
[packagelink.config].install.dependencies[1] should be string`);
    });

    it('should not be valid if "install.devDependencies" is not array of strings', () => {
      const config = {
        install: {
          devDependencies: [2, 3],
        },
      };
      const {isValid, error} = validate(config, installSchema);
      expect(isValid).toBeFalsy();
      expect(error).toBe(`[packagelink.config].install.devDependencies[0] should be string
[packagelink.config].install.devDependencies[1] should be string`);
    });

    it('should not be valid if "install.dependencies" is not array of unique strings', () => {
      const config = {
        install: {
          dependencies: ['a', 'b', 'a'],
        },
      };
      const {isValid, error} = validate(config, installSchema);
      expect(isValid).toBeFalsy();
      expect(error).toBe(
        `[packagelink.config].install.dependencies should NOT have duplicate items (items ## 2 and 0 are identical)`
      );
    });

    it('should not be valid if "install.devDependencies" is not array of unique strings', () => {
      const config = {
        install: {
          devDependencies: ['a', 'b', 'a'],
        },
      };
      const {isValid, error} = validate(config, installSchema);
      expect(isValid).toBeFalsy();
      expect(error).toBe(
        `[packagelink.config].install.devDependencies should NOT have duplicate items (items ## 2 and 0 are identical)`
      );
    });

    it('should be valid with dependencies only', () => {
      const config = {
        install: {
          dependencies: ['a', 'b'],
        },
      };
      const {isValid, error} = validate(config, installSchema);
      expect(isValid).toBeTruthy();
      expect(error).toBeUndefined();
    });

    it('should be valid with devDependencies only', () => {
      const config = {
        install: {
          devDependencies: ['a', 'b'],
        },
      };
      const {isValid, error} = validate(config, installSchema);
      expect(isValid).toBeTruthy();
      expect(error).toBeUndefined();
    });

    it('should be valid with dependencies and devDependencies', () => {
      const config = {
        install: {
          dependencies: ['a', 'b'],
          devDependencies: ['c', 'd'],
        },
      };
      const {isValid, error} = validate(config, installSchema);
      expect(isValid).toBeTruthy();
      expect(error).toBeUndefined();
    });

    it('should be valid if "publish" property in use', () => {
      const config = {
        publish: {
          packages: ['a', 'b'],
        },
        install: {
          dependencies: ['a', 'b'],
          devDependencies: ['c', 'd'],
        },
      };
      const {isValid, error} = validate(config, installSchema);
      expect(isValid).toBeTruthy();
      expect(error).toBeUndefined();
    });
  });
});
