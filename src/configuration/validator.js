const Joi = require('@hapi/joi');
const { ValidationError } = require('./errors');

const schema = Joi.object({
  connection: Joi.object({
    urls: Joi.array()
      .items(Joi.string())
      .min(1)
      .required(),
    username: Joi.string().allow(''),
    password: Joi.string().allow(''),
    agentOptions: Joi.object().unknown(),
    bearerToken: Joi.string().allow('')
  }).required(),
  database: Joi.object({
    name: Joi.string().required(),
    users: Joi.array().items(Joi.object().unknown()),
    collections: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        properties: Joi.object(),
        indexes: Joi.array().items(Joi.object())
      }).unknown()
    )
  }),
  graphs: Joi.array().items(Joi.object({}).unknown())
});

function validateConfiguration(configuration, logger) {
  logger.debug('Validating:');
  logger.debug(configuration);
  const { error, value } = schema.validate(configuration);

  if (error) {
    logger.debug('Configuration is not valid');
    throw new ValidationError(error);
  }

  return value;
}

module.exports = { validateConfiguration };
