import {builder} from '../../src/commands/install';

describe('install command', () => {
  describe('install builder', () => {
    it('should throw error if config is not valid', () => {
      const argv = {
        config: {
          install: {},
        },
      };
      const yargs = {
        check: jest.fn((callback) => {
          callback(argv);
        }),
      };

      let error;
      try {
        builder(yargs);
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
    });

    it('should return true if config is valid', () => {
      let checkResult;
      const argv = {
        config: {
          install: {
            dependencies: ['a', 'b'],
          },
        },
      };
      const yargs = {
        positional: jest.fn(() => {
          return yargs;
        }),
        option: jest.fn(() => {
          return yargs;
        }),
        check: jest.fn((callback) => {
          checkResult = callback(argv);
          return yargs;
        }),
      };

      builder(yargs);
      expect(checkResult).toBeTruthy();
    });
  });
});
