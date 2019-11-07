const GenericRepository = require('../database/repository/GenericRepository')

/**
 * Retorna todos os usuários cadastrados no sistema.
 * 
 * @author Guilherme da Silva Martin
 */
async function getAllUsers(params){
    try{
        return await new GenericRepository('User').findAll(params);
    }catch(ex){
        throw ex;
    }
}

module.exports = { getAllUsers }