module.exports = class ErrorResponse {
  constructor(statusCode, message, stackTrace) {
    this.statusCode = statusCode;
    this.message = message;
    this.stackTrace = stackTrace;
  }
};
