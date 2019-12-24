const spawn = require('child_process').spawn;

module.exports = class REPLService {
  /**
   * Start the service.
   *
   * @author Guilherme da Silva Martin
   */
  static async init(command) {
    const cmd = spawn(command, ['-i']);

    this.handleStdout(cmd);
    this.handleStderr(cmd);

    return this;
  }

  /**
   * Handle terminal stdout
   *
   * @author Guilherme da Silva Martin
   */
  static async handleStdout(cmd) {
    try {
      cmd.stdout.on('data', (data) => {
        return data;
      });
    } catch (ex) {
      return ex;
    }
  }

  /**
   * Handle terminal stderr
   *
   * @author Guilherme da Silva Martin
   */
  static async handleStderr(cmd) {
    try {
      cmd.stderr.on('data', (data) => {
        return data;
      });
    } catch (ex) {
      return ex;
    }
  }
};
