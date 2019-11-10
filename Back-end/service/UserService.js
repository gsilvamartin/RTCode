const UserRepository = require('../database/repository/UserRepository');
const UserModel = require('../database/models/User');

module.exports = class UserService {
  /**
   * Inicia o serviço
   *
   * @author Guilherme da Silva Martin
   */
  static async init() {
    this.repository = await UserRepository.init();

    return this;
  }

  /**
   * Retorna um usuário cadastrado no sistema por seu id.
   *
   * @author Guilherme da Silva Martin
   */
  static async getUserById(params) {
    try {
      return await this.repository.findUserById(params);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Insere um novo usuário
   *
   * @author Guilherme da Silva Martin
   */
  static async createNewUser(email, name, image, password) {
    try {
      const user = new UserModel({
        Email: email,
        Name: name,
        Image: image,
        Password: password
      });

      return await this.repository.createNewUser(user);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Deleta um usuário por seu id
   *
   * @author Guilherme da Silva Martin
   */
  static async deleteUser(id) {
    try {
      return await this.repository.deleteUser({ _id: id });
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Atualiza um usuário
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
        Name: nameUpdate,
        Email: emailUpdate,
        Password: passwordUpdate,
        Image: imageUpdate
      };

      return await this.repository.updateUser(paramSearch, paramUpdate);
    } catch (ex) {
      throw ex;
    }
  }
};
