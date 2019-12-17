const mongoose = require('mongoose');
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
   * @param {*} codeName name of the code
   * @param {*} userId user id of owner
   */
  static async createCode(codeName, userId) {
    try {
      if ((await this.repository.count(CodeModel, { CodeName: codeName })) === 0) {
        let code = {
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
};
