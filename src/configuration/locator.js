const { MissingConfigError, UnreadableConfigError } = require('./errors');
const fs = require('fs');

const CONFIG_FILES = ['.arango-cli', '.arango-cli.js', '.arango-cli.json'];

const FILE_PATTERN = /\.arango-cli(\.json|\.js)?/i;

module.exports = { getConfiguration, CONFIG_FILES };

async function getConfiguration(directory, logger = null) {
  let files = (await fs.promises.readdir(directory)).filter(filterFile).sort();

  if (files.length === 0) {
    throw new MissingConfigError(directory);
  }

  logger?.debug(`Found ${files.length} potential configuration files`);

  let path = `${directory}/${files[0]}`;

  try {
    logger?.debug(`Reading file '${path}'`);
    return require(path).configuration;
  } catch (e) {
    throw new UnreadableConfigError(path);
  }
}

function filterFile(fileName) {
  return fileName.match(FILE_PATTERN);
}
