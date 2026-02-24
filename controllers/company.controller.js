const CompanyService = require("../services/company.service");

class CompanyController {

    static async create(req, res) {
        try {
            const company = await CompanyService.createCompany(req.body);
            res.status(201).json(company);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error creating company" });
        }
    }

    static async getAll(req, res) {
        try {
            const companies = await CompanyService.getCompanies();
            res.json(companies);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error fetching companies" });
        }
    }

    static async getById(req, res) {
        try {
            const company = await CompanyService.getCompanyById(req.params.id);
            if (!company) {
                res.status(404).json({ error: "Company not found" });
            } else {
                res.json(company);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error fetching company" });
        }
    }

    static async update(req, res) {
        try {
            const company = await CompanyService.updateCompany(req.params.id, req.body);
            res.json(company);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error updating company" });
        }
    }

    static async delete (req, res) {
        try {
            const company = await CompanyService.deleteCompany(req.params.id);
            res.json(company);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error deleting company" });
        }
    }
}

module.exports = CompanyController;