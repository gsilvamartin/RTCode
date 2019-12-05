const UserRepository = require('../database/repository/UserRepository');
const UserModel = require('../database/models/User');

module.exports = class UserService {
    /**
     * Start the service.
     *
     * @author Guilherme da Silva Martin
     */
    static async init() {
        this.repository = await UserRepository.init();

        return this;
    }

    /**
     * Returns a user registered in the system by his id.
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
     * Create a new user.
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

    /**
     * Delete a user by id.
     *
     * @author Guilherme da Silva Martin
     */
    static async deleteUser(id) {
        try {
            return await this.repository.deleteUser({ _id: id });
        } catch (ex) {
            throw ex;
        }
    }

    /**
     * Update a user.
     *
     * @author Guilherme da Silva Martin
     */
    static async updateUser(idSearch, nameUpdate, emailUpdate, passwordUpdate, imageUpdate) {
        try {
            const paramSearch = {
                _id: idSearch
            };

            const paramUpdate = {
                _id: idSearch,
                Name: nameUpdate,
                Email: emailUpdate,
                Password: passwordUpdate,
                Image: imageUpdate
            };

            return await this.repository.updateUser(paramSearch, paramUpdate);
        } catch (ex) {
            throw ex;
        }
    }
};