const { resolveConfiguration } = require('../configuration/index.js');

const logger = require('console-log-level')({
  level: process.env.LOG_LEVEL || 'info',
});

module.exports = function wrapAction(action) {
  return async function wrappedAction(...args) {
    process.on('unhandledRejection', (error) => {
      logger.error(error);
    });

    let config;

    try {
      logger.debug(`Getting configuration details`);
      config = await resolveConfiguration(process.cwd(), logger);
    } catch (err) {
      logger.error(`Error parsing configuration:`);
      logger.error(err);
    }

    const commandContext = args.pop();
    return await action(
      ...commandContext.args,
      { configuration: config, logger: logger },
      commandContext
    );
  };
};
