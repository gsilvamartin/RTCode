const GenericRepository = require('../database/repository/GenericRepository');

module.exports.default = class UserService {
  /**
   * Inicia o serviço
   *
   * @author Guilherme da Silva Martin
   */
  static async init() {
    this.repository = await GenericRepository.default.init('User');

    return this;
  }

  /**
   * Retorna todos os usuários cadastrados no sistema.
   *
   * @author Guilherme da Silva Martin
   */
  static async getAllUsers() {
    try {
      return this.repository.findAll(null);
    } catch (ex) {
      throw ex;
    }
  }
};
