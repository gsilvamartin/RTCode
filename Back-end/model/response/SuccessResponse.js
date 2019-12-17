module.exports = class SuccessResponse {
  constructor(statusCode, data, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
};
