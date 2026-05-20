const UserService = require("../services/user.service");

class UserController {
    static sanitizeUser(user) {
        const data = user?.toJSON ? user.toJSON() : user;
        if (!data) return data;
        delete data.user_hashpwd;
        return data;
    }

    static async create(req, res) {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getAll(req, res) {
        try {
            const users = await UserService.getUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getById(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.json(UserController.sanitizeUser(user));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getMe(req, res) {
        try {
            const user = await UserService.getUserById(req.user.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(UserController.sanitizeUser(user));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            res.json(UserController.sanitizeUser(user));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateMe(req, res) {
        try {
            const user = await UserService.updateUser(req.user.id, req.body);
            res.json(UserController.sanitizeUser(user));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const user = await UserService.deleteUser(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;