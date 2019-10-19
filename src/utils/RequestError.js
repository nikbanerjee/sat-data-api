class RequestError extends Error {
  constructor(message = '', status = 500) {
    // pass error message to parent constructor
    super(message);

    // maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestError);
    }

    this.name = 'RequestError';
    // custom debugging information
    this.status = status;
  }
}

module.exports = RequestError;
