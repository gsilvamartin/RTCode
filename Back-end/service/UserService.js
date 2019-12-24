const GenericRepository = require('../database/repository/GenericRepository');
const UserModel = require('../database/model/User');

module.exports = class UserService {
  /**
   * Start the service.
   *
   * @author Guilherme da Silva Martin
   */
  static async init() {
    try {
      this.repository = await GenericRepository.init();
      return this;
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Returns a user registered in the system by his id.
   *
   * @author Guilherme da Silva Martin
   */
  static async getUserById(params) {
    try {
      return await this.repository.findById(UserModel, params);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Create a new user.
   *
   * @author Guilherme da Silva Martin
   */
  static async createNewUser(email, nickName, image, password) {
    try {
      const user = new UserModel({
        Nickname: nickName,
        Email: email,
        Password: password,
        Image: image
      });

      return await this.repository.create(UserModel, user);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Delete a user by id.
   *
   * @author Guilherme da Silva Martin
   */
  static async deleteUser(id) {
    try {
      return await this.repository.deleteById(UserModel, { _id: id });
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Update a user.
   *
   * @author Guilherme da Silva Martin
   */
  static async updateUser(idSearch, nameUpdate, emailUpdate, passwordUpdate, imageUpdate) {
    try {
      const paramSearch = {
        _id: idSearch
      };

      const paramUpdate = {
        _id: idSearch,
        Nickname: nameUpdate,
        Email: emailUpdate,
        Password: passwordUpdate,
        Image: imageUpdate
      };

      return await this.repository.update(UserModel, paramSearch, paramUpdate);
    } catch (ex) {
      throw ex;
    }
  }
};
