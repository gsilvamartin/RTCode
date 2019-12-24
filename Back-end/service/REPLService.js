const { spawn } = require('child_process');

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
      case 'node':
        return spawn('node', [process.env.CODE_LOCATION + codeName + '/' + fileName, '-i']);
      case 'python':
        return spawn('python', [process.env.CODE_LOCATION + codeName + '/' + fileName, '-i']);
      case 'javascript':
        return spawn('node', [process.env.CODE_LOCATION + codeName + '/' + fileName, '-i']);
      default:
        break;
    }
  }
};
