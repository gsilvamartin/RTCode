const db = require('../DatabaseConnection');
const user = require('../models/User');
const mongoose = require('mongoose');

module.exports = class UserRepository {
  /**
   * Inicia o repositório
   *
   * @author Guilherme da Silva Martin
   */
  static async init() {
    await db.getConnection();

    return this;
  }

  /**
   * Procura um usuário pelo seu id.
   *
   * @author Guilherme da Silva Martin
   */
  static async findUserById(params) {
    return await user.findById(new mongoose.Types.ObjectId(params));
  }

  /**
   * Insere um novo usuário
   *
   * @author Guilherme da Silva Martin
   */
  static async createNewUser(params) {
    return await user.create(params);
  }

  /**
   * Deleta um usuário por seu id
   *
   * @author Guilherme da Silva Martin
   */
  static async deleteUser(params) {
    return await user.findOneAndDelete({ _id: params });
  }

  /**
   * Atualiza um usuário
   *
   * @author Guilherme da Silva Martin
   * @param {*} paramsSearch parametro de busca
   * @param {*} paramsUpdate parametro de update
   */
  static async updateUser(paramsSearch, paramsUpdate) {
    return await user.findOneAndUpdate(paramsSearch, paramsUpdate);
  }
};
