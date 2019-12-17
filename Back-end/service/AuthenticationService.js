const jwt = require('jsonwebtoken');
const UserModel = require('../database/model/User');
const GenericRepository = require('../database/repository/GenericRepository');

module.exports = class AuthenticationService {
  /**
   * Starts the service
   *
   * @author Guilherme da Silva Martin
   */
  static async init() {
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
