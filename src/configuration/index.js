import { getConfiguration } from './locator.js';
// const validator = require('./validator');
// import Config from './config.js';

console.log('loading configuration');

export function resolveConfiguration(workingDirectory = process.cwd()) {
  let config = getConfiguration(workingDirectory);

  // validator.validate(config);
  return {};
  // return new Config(config);
}
