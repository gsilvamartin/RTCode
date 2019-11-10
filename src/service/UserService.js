const UserRepository = require('../database/repository/UserRepository');

module.exports = class UserService {
  /**
   * Inicia o serviço
   *
   * @author Guilherme da Silva Martin
   */
  static async init() {
    console.log('chegou aqui')
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
};
