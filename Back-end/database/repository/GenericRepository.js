const db = require('../DatabaseConnection');
const mongoose = require('mongoose');

module.exports = class GenericRepository {
  /**
   * Start the repository.
   *
   * @author Guilherme da Silva Martin
   */
  static async init() {
    await db.getConnection();

    return this;
  }

  /**
   * Search data by id.
   *
   * @author Guilherme da Silva Martin
   */
  static async findById(model, params) {
    return await model.findById(new mongoose.Types.ObjectId(params));
  }

  /**
   * Create a new data.
   *
   * @author Guilherme da Silva Martin
   */
  static async create(model, params) {
    return await model.create(params);
  }

  /**
   * Delete data by id.
   *
   * @author Guilherme da Silva Martin
   */
  static async deleteById(model, params) {
    return await model.findOneAndDelete({ _id: params });
  }

  /**
   * Update a user.
   *
   * @author Guilherme da Silva Martin
   * @param {*} paramsSearch
   * @param {*} paramsUpdate
   */
  static async update(model, paramsSearch, paramsUpdate) {
    return await model.findOneAndUpdate(paramsSearch, paramsUpdate);
  }
};
