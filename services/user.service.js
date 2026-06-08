const User = require("../models/User");

class UserService {
    static async createUser(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
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
            // Anonymisation RGPD — valeurs neutres respectant les contraintes NOT NULL
            await user.update({
                user_firstname:   "Utilisateur",
                user_lastname:    "Supprimé",
                user_email:       `deleted_${id}@deleted.invalid`,
                user_phone:       "0000000000",
                user_birth:       "1970-01-01",
                user_gender:      "prefer_not_to_say",
                user_size:        0,
                user_weight:      0,
                user_last_weight: 0,
                user_city:        null,
                user_country:     null,
                user_hashpwd:     "DELETED",
                sport_program_id: null,
            });
            return user;
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting user");
        }
    }
}

module.exports = UserService;