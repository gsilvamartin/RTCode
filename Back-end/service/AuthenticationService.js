const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const UtilClass = require('../util/Util');
const UserModel = require('../database/model/User');
const ErrorResponse = require('../model/response/ErrorResponse');
const GenericRepository = require('../database/repository/GenericRepository');

module.exports = class AuthenticationService {
  /**
   * Starts the service
   *
   * @author Guilherme da Silva Martin
   */
  static async init() {
    this.util = UtilClass.init();
    this.repository = await GenericRepository.init();

    return this;
  }

  /**
   * Authenticate a user
   *
   * @author Guilherme da Silva Martin
   * @param {*} email
   * @param {*} password
   */
  static async authenticateUser(email, password) {
    try {
      let userData = await this.login(email, password);

      if (!this.util.isNullOrEmpty(userData)) {
        const token = await jwt.sign(
          { id: userData[0]._id, nickname: userData[0].Nickname, email: userData[0].Email },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 24 }
        );

        return token;
      } else {
        throw new ErrorResponse(400, 'User not found', null);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Login a user.
   *
   * @author Guilherme da Silva Martin
   */
  static async login(email, password) {
    try {
      let loginParams = {
        Email: email,
        Password: password
      };

      return await this.repository.find(UserModel, loginParams);
    } catch (ex) {
      throw ex;
    }
  }
};
