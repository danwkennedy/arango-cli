const { getConfiguration } = require('./locator');
const { validateConfiguration } = require('./validator');

module.exports = { resolveConfiguration };

async function resolveConfiguration(
  workingDirectory = process.cwd(),
  logger = null
) {
  const config = await getConfiguration(workingDirectory, logger);

  return validateConfiguration(config, logger);
}
