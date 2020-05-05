import {builder} from '../../src/commands/publish';

describe('publish command', () => {
  describe('publish builder', () => {
    it('should throw error if config is not valid', () => {
      const argv = {
        config: {
          publish: {},
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
      const argv = {
        config: {
          publish: {
            packages: ['a', 'b'],
          },
        },
      };
      const yargs = {
        check: jest.fn((callback) => {
          return callback(argv);
        }),
      };

      builder(yargs);
      expect(yargs.check).toReturnWith(true);
    });
  });
});
