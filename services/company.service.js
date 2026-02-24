const Company = require("../models/Company");
const User = require("../models/User");

class CompanyService {
    static async createCompany(data) {
        try {
            const company = await Company.create(data);
            return company;
        } catch (error) {
            console.error(error);
            throw new Error("Error creating company");
        }
    }

    static async getCompanies() {
        try {
            const companies = await Company.findAll();
            return companies;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching companies");
        }
    }

    static async getCompanyById(id) {
        try {
            const company = await Company.findByPk(id);
            return company;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching company");
        }
    }

    static async updateCompany(id, data) {
        try {
            const company = await Company.findByPk(id);
            if (!company) {
                throw new Error("Company not found");
            }
            await company.update(data);
            return company;
        } catch (error) {
            console.error(error);
            throw new Error("Error updating company");
        }
    }

    static async deleteCompany(id) {
        try {
            const company = await Company.findByPk(id);
            if (!company) {
                throw new Error("Company not found");
            }
            await company.destroy();
            return company;
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting company");
        }
    }
}

module.exports = CompanyService;