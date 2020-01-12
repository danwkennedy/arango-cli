const validator = require('./validator');
const { ValidationError } = require('./errors');

describe(`Config validator`, () => {
  test(`throws on invalid settings`, () => {
    const invalid = [{}, { connection: {} }];

    for (const bad of invalid) {
      expect(() => validator.validateConfiguration(bad)).toThrow(
        ValidationError
      );
    }
  });

  test(`returns the configuration for valid configurations`, () => {
    const valid = [
      {
        connection: {
          urls: ['http://localhost:8529']
        }
      }
    ];

    for (const good of valid) {
      expect(validator.validateConfiguration(good)).toEqual(good);
    }
  });
});
