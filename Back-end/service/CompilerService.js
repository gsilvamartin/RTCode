const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

module.exports = class CompilerService {
  /**
   * Execute a shell command.
   *
   * @author Guilherme da Silva Martin
   * @param {*} command
   */
  static async executeCommand(command) {
    try {
      const cmdReturn = await exec(command);

      return cmdReturn.stdout !== undefined && cmdReturn.stdout !== null ? cmdReturn.stdout : cmdReturn.stderr;
    } catch (ex) {
      return ex.stderr;
    }
  }
};
