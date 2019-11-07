const database = require('../DatabaseConnection')

class GenericRepository {
    constructor(collection) {
        let databaseConnection = await database.getConnection();
        this.client = await databaseConnection.collection(collection);
    }

    /**
     * Retorna um único registro procurando-o por sua chave
     * primária.
     * 
     * @author Guilherme da Silva Martin
     * @param {*} params chave primária 
     */
    async findOne(params) {
        return this.client.findOne(params);
    }

    /**
     * Retorna todos os registros encontrados comparando com
     * o objeto de parâmetro recebido.
     * 
     * @author Guilherme da Silva Martin
     * @param {*} params objeto contendo parametros para a busca
     */
    async findAll(params) {
        return this.client.findOne(params);
    }

    /**
     * Deleta o registro correspondente com o objeto enviado como
     * parãmetro
     * 
     * @author Guilherme da Silva Martin
     * @param {*} params objeto contendo parametros para a exclusão
     */
    async deleteOne(params) {
        return this.client.deleteOne(params);
    }

    /**
     * Deleta os registros encontrados correspondente com o objeto enviado como
     * parãmetro
     * 
     * @author Guilherme da Silva Martin
     * @param {*} params objeto contendo parametros para a exclusão
     */
    async deleteMany(params) {
        return this.client.deleteMany(params);
    }

    /**
     * Atualiza o primeiro registro encontrado com os parâmetros 
     * correspondentes.
     * 
     * @author Guilherme da Silva Martin 
     * @param {*} params parâmetros para a atualização
     */
    async updateOne(params){
        return this.client.updateOne(params);
    }

    /**
     * Atualiza todos os registros encontrados pelos parâmetros enviados.
     * 
     * @author Guilherme da Silva Martin 
     * @param {*} params 
     */
    async updateAll(params){
        return this.client.updateMany(params);
    }
}

module.exports = GenericRepository