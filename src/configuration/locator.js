import { MissingConfigError, UnreadableConfigError } from './errors/index.js';
import { readdirSync } from 'fs';

const CONFIG_FILES = ['.arango-cli', '.arango-cli.js', '.arango-cli.json'];

const FILE_PATTERN = /\.arango-cli(\.json|\.js)?/i;

export function getConfiguration(directory) {
  let files = readdirSync(directory)
    .filter(filterFile)
    .sort();

  if (files.length === 0) {
    throw new MissingConfigError(directory);
  }

  let path = `${directory}/${files[0]}`;

  try {
    return require(path);
  } catch (e) {
    throw new UnreadableConfigError(path);
  }
}

function filterFile(fileName) {
  return fileName.match(FILE_PATTERN);
}

module.exports = {
  getConfiguration: getConfiguration,
  files: CONFIG_FILES
};
