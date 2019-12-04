import { validate } from 'schema-inspector';
import ValidationError from './errors/validation';

const constraints = {
  type: 'object',
  properties: {
    // indexes: {
    //   type: 'array',
    //   items: {
    //     type: 'object',
    //     properties: {
    //       alias: { type: 'string' },
    //       settings: { type: 'object' },
    //       mappings: { type: 'object' }
    //     }
    //   }
    // },
    // connection: {
    //   type: 'object',
    //   optional: true,
    //   properties: {
    //     hosts: { type: 'array', items: { type: 'string' } },
    //     version: { type: 'string' }
    //   }
    // },
    // getClient: {
    //   type: 'function',
    //   optional: true
    // }
  }
  // exec: function(schema, candidate) {
  //   if (!candidate.connection && !candidate.getClient) {
  //     this.report(
  //       'Must specify at least a connection object or a getClient function'
  //     );
  //   }
  // }
};

export function validate(configuration) {
  let validation = validate(constraints, configuration);

  if (!validation.valid) {
    throw new ValidationError(validation.error);
    // throw `Invalid configuration passed: ${ validation.format() }`;
  }

  return validation.valid;
}
