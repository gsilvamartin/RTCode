const GenericRepository = require('../database/repository/GenericRepository');
const UserCodeModel = require('../database/model/User');

module.exports = class UserCodeService {
  /**
   * Starts the service.
   *
   * @author Guilherme da Silva Martin
   */
  static async init() {
    this.repository = await GenericRepository.init();

    return this;
  }

  /**
   * Check by the user ID if they have permission to enter code.
   *
   * @author Guilherme da Silva Martin
   */
  static async verifyUserPermission(codeName, userId) {
    try {
      const codeDetail = await this.repository.findOne(UserCodeModel, { CodeName: codeName });
      const codeExists = await this.repository.count(UserCodeModel, { CodeId: codeDetail._id, UserId: userId });

      return !!codeExists;
    } catch (ex) {
      throw ex;
    }
  }
};
