module.exports = class ErrorResponse {
  constructor(statusCode, message, stack) {
    this.statusCode = statusCode;
    this.message = message;
    this.stack = stack;
  }
};
