import ExtendableError from 'es6-error';

export default class UnreadableConfigError extends ExtendableError {
  constructor(path) {
    super(`Error reading configuration file: '${path}'`);
  }
}
