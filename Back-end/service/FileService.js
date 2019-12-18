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

      return files;
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Create a new file into a code folder.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} fileName
   */
  static async createNewCodeFile(codeName, fileName) {
    try {
      const fullPath = process.env.CODE_LOCATION + codeName + '/' + fileName;

      if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, '');
      } else {
        throw new ErrorResponse(401, 'File already exists.', null);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Delete a file inside a code folder.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} fileName
   */
  static async deleteCodeFile(codeName, fileName) {
    try {
      const fullPath = process.env.CODE_LOCATION + codeName + '/' + fileName;

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath, '');
      } else {
        throw new ErrorResponse(401, 'File not found.', null);
      }
    } catch (ex) {
      throw ex;
    }
  }
};
