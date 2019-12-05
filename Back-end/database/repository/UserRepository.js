const db = require('../DatabaseConnection');
const user = require('../models/User');
const mongoose = require('mongoose');

module.exports = class UserRepository {
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
     * Searches for a user by their id.
     *
     * @author Guilherme da Silva Martin
     */
    static async findUserById(params) {
        return await user.findById(new mongoose.Types.ObjectId(params));
    }

    /**
     * Create a new user.
     *
     * @author Guilherme da Silva Martin
     */
    static async createNewUser(params) {
        return await user.create(params);
    }

    /**
     * Delete a user by id.
     *
     * @author Guilherme da Silva Martin
     */
    static async deleteUser(params) {
        return await user.findOneAndDelete({ _id: params });
    }

    /**
     * Update a user.
     *
     * @author Guilherme da Silva Martin
     * @param {*} paramsSearch parametro de busca
     * @param {*} paramsUpdate parametro de update
     */
    static async updateUser(paramsSearch, paramsUpdate) {
        return await user.findOneAndUpdate(paramsSearch, paramsUpdate);
    }
};