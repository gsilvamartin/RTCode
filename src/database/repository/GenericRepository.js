const database = require('../DatabaseConnection')

class GenericRepository {
    /**
     * Inicia o repositório
     * 
     * @author mestre elias
     */
    async init() {
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
    async findOne(params) {
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
    async findAll(params) {
        try {
            return this.client.findAll(params);
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
    async deleteOne(params) {
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
    async deleteMany(params) {
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
    async updateOne(params) {
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
    async updateAll(params) {
        try {
            return this.client.updateMany(params);
        } catch (ex) {
            throw ex;
        }
    }
}

module.exports = GenericRepository