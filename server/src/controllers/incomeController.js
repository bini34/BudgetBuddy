const incomeService = require('../services/incomeServices');
const apiResponse = require('../utils/apiResponse');

class IncomeController {
    // Add income
    async addIncome(req, res) {
        try {
            const incomeData = {
                ...req.body,
            };
            const income = await incomeService.createIncome(incomeData);
            return apiResponse.created(res, income, 'Income added successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    // Get all incomes for a user
    async getAllIncomes(req, res) {
        try {
            const userId = req.params.userId;
            const incomes = await incomeService.getAllIncomes(userId);
            return apiResponse.success(res, incomes, 'Incomes retrieved successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    // Get income by ID
    async getIncomeById(req, res) {
        try {
            const income = await incomeService.getIncomeById(req.params.incomeId);
            return apiResponse.success(res, income, 'Income retrieved successfully');
        } catch (error) {
            if (error.message === 'Income not found') {
                return apiResponse.notFound(res, error.message);
            }
            return apiResponse.error(res, error.message);
        }
    }

    // Update income
    async updateIncome(req, res) {
        try {
            const income = await incomeService.updateIncome(
                req.params.incomeId,
                req.body
            );
            return apiResponse.updated(res, income, 'Income updated successfully');
        } catch (error) {
            if (error.message === 'Income not found') {
                return apiResponse.notFound(res, error.message);
            }
            return apiResponse.error(res, error.message);
        }
    }

    // Delete income
    async deleteIncome(req, res) {
        try {
            await incomeService.deleteIncome(req.params.incomeId);
            return apiResponse.deleted(res, 'Income deleted successfully');
        } catch (error) {
            if (error.message === 'Income not found') {
                return apiResponse.notFound(res, error.message);
            }
            return apiResponse.error(res, error.message);
        }
    }

    async getIncomeByYear(req, res) {
        try {
            const { userId, year } = req.params;
            const yearlyIncome = await incomeService.getIncomeByYear(
                userId, 
                parseInt(year)
            );
            return apiResponse.success(
                res, 
                yearlyIncome, 
                'Yearly income retrieved successfully'
            );
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }
}

module.exports = new IncomeController();
