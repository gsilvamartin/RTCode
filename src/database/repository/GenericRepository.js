const database = require('../DatabaseConnection');

module.exports.default = class GenericRepository {
  /**
   * Inicia o repositório
   *
   * @author Guilherme da Silva Martin
   */
  static async init(collection) {
    let databaseConnection = await database.getConnection();

    this.client = await databaseConnection.collection(collection);
    return this;
  }

  /**
   * Retorna um único registro procurando-o por sua chave
   * primária.
   *
   * @author Guilherme da Silva Martin
   * @param {*} params chave primária
   */
  static async findOne(params) {
    try {
      return this.client.findOne(params);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Retorna todos os registros encontrados comparando com
   * o objeto de parâmetro recebido.
   *
   * @author Guilherme da Silva Martin
   * @param {*} params objeto contendo parametros para a busca
   */
  static async findAll(params) {
    try {
      return this.client.find(params);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Deleta o registro correspondente com o objeto enviado como
   * parãmetro
   *
   * @author Guilherme da Silva Martin
   * @param {*} params objeto contendo parametros para a exclusão
   */
  static async deleteOne(params) {
    try {
      return this.client.deleteOne(params);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Deleta os registros encontrados correspondente com o objeto enviado como
   * parãmetro
   *
   * @author Guilherme da Silva Martin
   * @param {*} params objeto contendo parametros para a exclusão
   */
  static async deleteMany(params) {
    try {
      return this.client.deleteMany(params);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Atualiza o primeiro registro encontrado com os parâmetros
   * correspondentes.
   *
   * @author Guilherme da Silva Martin
   * @param {*} params parâmetros para a atualização
   */
  static async updateOne(params) {
    try {
      return this.client.updateOne(params);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Atualiza todos os registros encontrados pelos parâmetros enviados.
   *
   * @author Guilherme da Silva Martin
   * @param {*} params
   */
  static async updateAll(params) {
    try {
      return this.client.updateMany(params);
    } catch (ex) {
      throw ex;
    }
  }
};
