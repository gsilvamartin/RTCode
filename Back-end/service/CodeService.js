const mongoose = require('mongoose');
const CodeModel = require('../database/model/Code');
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
      let code = {
        CodeName: codeName,
        IsActive: true,
        UserId: new mongoose.Types.ObjectId(userId)
      };

      return this.repository.create(CodeModel, code);
    } catch (ex) {
      throw ex;
    }
  }
};
