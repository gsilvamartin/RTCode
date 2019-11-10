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
};
