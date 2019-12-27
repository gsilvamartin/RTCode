const { spawn, exec } = require('child_process');
const ErrorResponse = require('../model/response/ErrorResponse');

module.exports = class REPLService {
  /**
   * Start the service.
   *
   * @author Guilherme da Silva Martin
   */
  static init() {
    return this;
  }

  /**
   * Get terminal session.
   *
   * @author Guilherme da Silva Martin
   */
  static getTerminalSession(language, codeName, fileName) {
    switch (language) {
      case 'c':
        exec('gcc' + process.env.CODE_LOCATION + codeName + '/' + fileName);
        return spawn('./a.out');
      case 'java':
        exec('cd ' + process.env.CODE_LOCATION + codeName);
        exec('javac *.java');
        return spawn('java', [process.env.CODE_LOCATION + codeName + '/' + fileName]);
      case 'node':
        return spawn('node', [process.env.CODE_LOCATION + codeName + '/' + fileName, '-i']);
      case 'python':
        return spawn('python', [process.env.CODE_LOCATION + codeName + '/' + fileName, '-i']);
      case 'javascript':
        return spawn('node', [process.env.CODE_LOCATION + codeName + '/' + fileName, '-i']);
      default:
        return spawn('Error to execute file');
    }
  }
};
