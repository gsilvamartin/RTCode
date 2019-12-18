const mongoose = require('mongoose');
const FileService = require('../service/FileService');
const CodeModel = require('../database/model/Code');
const ErrorResponse = require('../model/response/ErrorResponse');
const GenericRepository = require('../database/repository/GenericRepository');

module.exports = class CodeService {
  /**
   * Start the service.
   *
   * @author Guilherme da Silva Martin
   */
  static async init() {
    this.repository = await GenericRepository.init();

    return this;
  }

  /**
   * Create a new code.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName name of the code
   * @param {*} userId user id of owner
   */
  static async createCode(codeName, userId) {
    try {
      if ((await this.repository.count(CodeModel, { CodeName: codeName })) === 0) {
        const code = {
          CodeName: codeName,
          IsActive: true,
          UserId: new mongoose.Types.ObjectId(userId)
        };

        return await this.repository.create(CodeModel, code);
      } else {
        throw new ErrorResponse(401, 'Code already exists', null);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Get file tree of specific code.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} userId
   */
  static async getCodeFileTree(codeName, userId) {
    try {
      if (await this.verifyUserCodePermission(codeName, userId)) {
        const fileService = await FileService.init();
        const files = await fileService.listContentOfCodeFolder(codeName);

        return files;
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Create a new code file.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} userId
   */
  static async createNewCodeFile(codeName, fileName, userId) {
    try {
      if (await this.verifyUserCodePermission(codeName, userId)) {
        const fileService = await FileService.init();

        return await fileService.createNewCodeFile(codeName, fileName);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Verify if user has permission to access code.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} userId
   */
  static async verifyUserCodePermission(codeName, userId) {
    try {
      const code = {
        CodeName: codeName,
        UserId: new mongoose.Types.ObjectId(userId)
      };

      return !!((await this.repository.count(CodeModel, code)) > 0);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Delete code by name.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} userId
   */
  static async deleteCode(codeName, userId) {
    try {
      const fileService = await FileService.init();
      const code = {
        CodeName: codeName,
        UserId: new mongoose.Types.ObjectId(userId)
      };

      const deleteDB = await this.repository.delete(CodeModel, code);
      const deleteFS = await fileService.deleteCodeFolder(codeName);

      if (deleteDB && deleteFS) {
        return true;
      } else {
        throw new ErrorResponse(500, 'Error to delete code folder.', null);
      }
    } catch (ex) {
      throw ex;
    }
  }
};
