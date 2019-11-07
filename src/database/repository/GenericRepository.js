var mongodb = require('mongodb');
let User = require('../models/User')
const database = require('../DatabaseConnection')

class GenericRepository {
    constructor(db) {
        this.db = await database.getConnection();
    }

    async get() {
        const client = await database.getConnection();
    }
}