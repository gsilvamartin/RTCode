const GenericRepository = require('../database/repository/GenericRepository');
const ErrorResponse = require('../model/response/ErrorResponse');
const UserCodeModel = require('../database/model/UserCode');
const UserModel = require('../database/model/User');
const CodeModel = require('../database/model/Code');

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
      const codeDetail = await this.repository.findOne(CodeModel, { CodeName: codeName });
      const userPermission = await this.repository.count(UserCodeModel, { CodeId: codeDetail._id, UserId: userId });

      return !!userPermission;
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * List all codes of the user have permission
   *
   * @author Matheus Muriel
   */
  static async listCodes(userId) {
    return await this.repository.find(CodeModel, { UserId: userId });
  }

  /**
   * Adds read/write permission in the code to the user sent by id.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} userId
   * @param {*} permissionUserId
   */
  static async addUserPermission(codeName, userId, permissionUserId) {
    try {
      const isUserCodeOwner = await this.repository.count(UserModel, { CodeName: codeName, UserId: userId });

      if (isUserCodeOwner > 0) {
        const userPermission = { UserId: userId, CodeId: permissionUserId };
        const newPermission = await this.repository.create(UserCodeModel, userPermission);

        return newPermission;
      } else {
        throw new ErrorResponse(401, 'You need to be owner of the code to add collaborators.', null);
      }
    } catch (ex) {
      throw ex;
    }
  }
};
