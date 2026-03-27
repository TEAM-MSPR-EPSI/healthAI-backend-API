const UserAllergyService = require("../services/userAllergy.service");

class UserAllergyController {
    static async getByUserId(req, res) {
        try {
            const allergies = await UserAllergyService.getUserAllergies(req.params.userId);
            res.json(allergies);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async set(req, res) {
        try {
            const result = await UserAllergyService.setUserAllergies(
                req.params.userId,
                req.body.allergies
            );
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async add(req, res) {
        try {
            const result = await UserAllergyService.addUserAllergy(
                req.params.userId,
                req.body.allergy
            );
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async remove(req, res) {
        try {
            const result = await UserAllergyService.removeUserAllergy(
                req.params.userId,
                req.params.allergy
            );
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserAllergyController;
