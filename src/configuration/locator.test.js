jest.mock('fs');

const locator = require('./locator');
const { MissingConfigError, UnreadableConfigError } = require('./errors');

describe(`Config locator`, () => {
  test(`lists the file types that it looks for`, () => {
    let files = locator.CONFIG_FILES;

    expect(files.length).toBe(3);
    expect(files).toEqual([
      '.arango-cli',
      '.arango-cli.js',
      '.arango-cli.json'
    ]);
  });

  test(`throws if it can't find a candidate`, async () => {
    require('fs').__setMockFiles({});
    await expect(locator.getConfiguration('dir')).rejects.toEqual(
      new MissingConfigError('dir')
    );
  });

  test(`throws if it can't read a path`, async () => {
    require('fs').__setMockFiles({
      'dir/.arango-cli': 'content'
    });

    await expect(locator.getConfiguration('dir')).rejects.toEqual(
      new UnreadableConfigError('dir/.arango-cli')
    );
  });
});
