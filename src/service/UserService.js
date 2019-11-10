const UserRepository = require('../database/repository/UserRepository');
const UserModel = require('../database/models/User');

module.exports = class UserService {
    /**
     * Inicia o serviço
     *
     * @author Guilherme da Silva Martin
     */
    static async init() {
        this.repository = await UserRepository.init();

        return this;
    }

    /**
     * Retorna um usuário cadastrado no sistema por seu id.
     *
     * @author Guilherme da Silva Martin
     */
    static async getUserById(params) {
        try {
            return await this.repository.findUserById(params);
        } catch (ex) {
            throw ex;
        }
    }

    /**
     * Insere um novo usuário
     *
     * @author Guilherme da Silva Martin
     */
    static async createNewUser(email, name, image, password) {
        try {
            const user = new UserModel({
                Email: email,
                Name: name,
                Image: image,
                Password: password
            });

            return await this.repository.createNewUser(user);
        } catch (ex) {
            throw ex;
        }
    }
};
