const User = require("../models/User");

class UserService {
    static async createUser(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.error(error);
            throw new Error("Error creating user");
        }
    }

    static async getUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching users");
        }
    }

    static async getUserById(id) {
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching user");
        }
    }

    static async updateUser(id, data) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error("User not found");
            }
            await user.update(data);
            return user;
        } catch (error) {
            console.error(error);
            throw new Error("Error updating user");
        }
    }

    static async deleteUser(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error("User not found");
            }
            await user.destroy();
            return user;
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting user");
        }
    }
}

