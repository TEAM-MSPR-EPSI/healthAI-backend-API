const UserHealthProfileService = require("../services/userHealthProfile.service");

class UserHealthProfileController {

    static async create(req, res) {
        try {
            const userHealthProfile = await UserHealthProfileService.createUserHealthProfile(req.body);
            res.status(201).json(userHealthProfile);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const userHealthProfiles = await UserHealthProfileService.getUserHealthProfiles();
            res.json(userHealthProfiles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const userHealthProfile = await UserHealthProfileService.getUserHealthProfileById(req.params.id);
            res.json(userHealthProfile);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getByUserId(req, res) {
        try {
            const userHealthProfile = await UserHealthProfileService.getUserHealthProfileByUserId(req.params.userId);
            res.json(userHealthProfile);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const userHealthProfile = await UserHealthProfileService.updateUserHealthProfile(req.params.id, req.body);
            res.json(userHealthProfile);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const userHealthProfile = await UserHealthProfileService.deleteUserHealthProfile(req.params.id);
            res.json(userHealthProfile);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserHealthProfileController;
