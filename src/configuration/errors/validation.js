import ExtendableError from 'es6-error';

export default class ValidationError extends ExtendableError {
  constructor(errors) {
    super(`There were invalid fields in your configuration`);
    this.errors = errors;
  }
}
