const fs = require('fs');
const dotenv = require('dotenv').config();

module.exports = class FileService {
  /**
   * Start service.
   *
   * @author Guilherme da Silva Martin
   */
  static async init() {
    return this;
  }

  /**
   * List content of code folder.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   */
  static async listContentOfCodeFolder(codeName) {
    try {
      const files = fs.readdirSync(process.env.CODE_LOCATION + codeName);
    } catch (ex) {
      throw ex;
    }
  }
};
