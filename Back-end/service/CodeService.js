const mongoose = require('mongoose');
const FileService = require('../service/FileService');
const CodeModel = require('../database/model/Code');
const UserCodeService = require('../service/UserCodeService');
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
   * @param {*} language language of code
   */
  static async createCode(codeName, userId, language) {
    try {
      if ((await this.repository.count(CodeModel, { CodeName: codeName })) === 0) {
        const code = {
          CodeName: codeName,
          IsActive: true,
          UserId: new mongoose.Types.ObjectId(userId),
          CodeLanguage: language
        };

        const fileService = await FileService.init();

        fileService.createCodeFolder(codeName);

        return await this.repository.create(CodeModel, code);
      } else {
        throw new ErrorResponse(401, 'Code already exists', null);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Verify if the code exists
   *
   * @author Matheus Muriel
   * @param {*} codeName
   */
  static async verifyCodeExist(codeName) {
    return await this.repository.count(CodeModel, { CodeName: codeName }) > 0;
  }

  /**
   * Returns the language of code.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   */
  static async getCodeLanguage(codeName) {
    try {
      const code = await this.repository.find(CodeModel, { CodeName: codeName });

      return code[0].CodeLanguage;
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
      } else {
        throw new ErrorResponse(401, "You don't have permisson to access this code", null);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Return the content of a file.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} fileName
   * @param {*} userId
   */
  static async getFileContent(codeName, fileName, userId) {
    try {
      if (await this.verifyUserCodePermission(codeName, userId)) {
        const fileService = await FileService.init();
        const file = await fileService.getFileContent(codeName, fileName);

        return file;
      } else {
        throw new ErrorResponse(401, "You don't have permisson to change this code", null);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Update code file content.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} fileName
   * @param {*} fileContent
   */
  static async updateCodeFileContent(codeName, fileName, fileContent, userId) {
    try {
      if (await this.verifyUserCodePermission(codeName, userId)) {
        const fileService = await FileService.init();
        const file = await fileService.updateCodeFileContent(codeName, fileName, fileContent);

        return file;
      } else {
        throw new ErrorResponse(401, "You don't have permisson to change this code", null);
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
      } else {
        throw new ErrorResponse(401, "You don't have permisson to change this code", null);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Delete a code file by name.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} codeFile
   * @param {*} userId
   */
  static async deleteCodeFile(codeName, codeFile, userId) {
    try {
      if (await this.verifyUserCodePermission(codeName, userId)) {
        const fileService = await FileService.init();

        return await fileService.deleteCodeFile(codeName, codeFile);
      } else {
        throw new ErrorResponse(401, "You don't have permisson to change this code.", null);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Update a file name.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} codeFile
   * @param {*} userId
   */
  static async updateCodeFileName(codeName, oldCodeFile, newCodeFile, userId) {
    try {
      if (await this.verifyUserCodePermission(codeName, userId)) {
        const fileService = await FileService.init();

        return await fileService.updateCodeFileName(codeName, oldCodeFile, newCodeFile);
      } else {
        throw new ErrorResponse(401, "You don't have permisson to change this code.", null);
      }
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
      if (await this.verifyUserCodePermission(codeName, userId)) {
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
      } else {
        throw new ErrorResponse(401, "You don't have permisson to change this code.", null);
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
      const userCodeService = await UserCodeService.init();

      const code = {
        CodeName: codeName,
        UserId: new mongoose.Types.ObjectId(userId)
      };

      if (
        (await this.repository.count(CodeModel, code)) > 0 ||
        (await userCodeService.verifyUserPermission(code, userId))
      ) {
        return true;
      } else {
        return false;
      }
    } catch (ex) {
      throw ex;
    }
  }
};
