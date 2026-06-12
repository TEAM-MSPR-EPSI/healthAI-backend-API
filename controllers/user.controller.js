const UserService = require("../services/user.service");
const UserProfileService = require("../services/userProfile.service");

class UserController {
    static sanitizeUser(user) {
        const data = user?.toJSON ? user.toJSON() : user;
        if (!data) return data;
        delete data.user_hashpwd;
        return data;
    }

    static async withAvatar(user) {
        const data = UserController.sanitizeUser(user);
        if (!data) return data;
        const avatar = await UserProfileService.getAvatar(data.user_id);
        return {
            ...data,
            user_avatar_url: avatar?.avatarUrl || null,
            user_avatar_emoji: avatar?.avatarEmoji || null,
        };
    }

    static async create(req, res) {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(await UserController.withAvatar(user));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getAll(req, res) {
        try {
            const users = await UserService.getUsers();
            const payload = await Promise.all(users.map((user) => UserController.withAvatar(user)));
            res.json(payload);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getById(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.json(await UserController.withAvatar(user));
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
            res.json(await UserController.withAvatar(user));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            res.json(await UserController.withAvatar(user));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateMe(req, res) {
        try {
            const user = await UserService.updateUser(req.user.id, req.body);
            res.json(await UserController.withAvatar(user));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateAvatar(req, res) {
        try {
            let baseMediaUrl = process.env.PUBLIC_MEDIA_URL;
            if (!baseMediaUrl || baseMediaUrl === 'http://localhost') {
                const hostWithoutPort = req.get("host") ? req.get("host").split(':')[0] : 'localhost';
                baseMediaUrl = `${req.protocol}://${hostWithoutPort}`;
            }
            const avatarUrl = req.file
                ? `${baseMediaUrl}/avatars/${req.file.key}`
                : null;
            const avatarEmoji = (req.body.avatarEmoji || req.body.user_avatar_emoji || '').trim() || null;
            await UserProfileService.setAvatar(req.user.id, {
                avatarUrl,
                avatarEmoji,
            });
            const user = await UserService.getUserById(req.user.id);
            res.json(await UserController.withAvatar(user));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const user = await UserService.deleteUser(req.params.id);
            res.json(UserController.sanitizeUser(user));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;