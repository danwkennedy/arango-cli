import ExtendableError from 'es6-error';

export default class MissingConfigError extends ExtendableError {
  constructor(path) {
    super(`Could not find any configuration files in path: '${path}'`);
  }
}
