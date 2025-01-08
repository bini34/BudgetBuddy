const budgetService = require('../services/budgetServices');
const apiResponse = require('../utils/apiResponse');

class BudgetController {
    async createBudget(req, res) {
        try {
            const budget = await budgetService.createBudget(req.user.id, req.body);
            return apiResponse.created(res, budget, 'Budget created successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async getUserBudgets(req, res) {
        try {
            const budgets = await budgetService.getUserBudgets(req.user.id);
            return apiResponse.success(res, budgets);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async getBudgetById(req, res) {
        try {
            const budget = await budgetService.getBudgetById(req.params.id, req.user.id);
            return apiResponse.success(res, budget);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async getBudgetByMonth(req, res) {
        try {
            const budget = await budgetService.getBudgetByMonth(
                req.user.id,
                parseInt(req.params.year),
                parseInt(req.params.month)
            );
            return apiResponse.success(res, budget);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async updateBudget(req, res) {
        try {
            const budget = await budgetService.updateBudget(req.params.id, req.user.id, req.body);
            return apiResponse.updated(res, budget);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async deleteBudget(req, res) {
        try {
            await budgetService.deleteBudget(req.params.id, req.user.id);
            return apiResponse.deleted(res);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async addIncomeSource(req, res) {
        try {
            const budget = await budgetService.addIncomeSource(req.params.id, req.user.id, req.body);
            return apiResponse.created(res, budget, 'Income source added successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async updateIncomeSource(req, res) {
        try {
            const budget = await budgetService.updateIncomeSource(
                req.params.id,
                req.user.id,
                req.params.incomeId,
                req.body
            );
            return apiResponse.updated(res, budget);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async deleteIncomeSource(req, res) {
        try {
            const budget = await budgetService.deleteIncomeSource(
                req.params.id,
                req.user.id,
                req.params.incomeId
            );
            return apiResponse.deleted(res, 'Income source deleted successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async addExpenseCategory(req, res) {
        try {
            const budget = await budgetService.addExpenseCategory(
                req.params.id,
                req.user.id,
                req.params.type,
                req.body
            );
            return apiResponse.created(res, budget, 'Expense category added successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async updateExpenseCategory(req, res) {
        try {
            const budget = await budgetService.updateExpenseCategory(
                req.params.id,
                req.user.id,
                req.params.type,
                req.params.categoryId,
                req.body
            );
            return apiResponse.updated(res, budget);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async deleteExpenseCategory(req, res) {
        try {
            const budget = await budgetService.deleteExpenseCategory(
                req.params.id,
                req.user.id,
                req.params.type,
                req.params.categoryId
            );
            return apiResponse.deleted(res, 'Expense category deleted successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async addSavingsPlan(req, res) {
        try {
            const budget = await budgetService.addSavingsPlan(req.params.id, req.user.id, req.body);
            return apiResponse.created(res, budget, 'Savings plan added successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async updateSavingsPlan(req, res) {
        try {
            const budget = await budgetService.updateSavingsPlan(
                req.params.id,
                req.user.id,
                req.params.savingsId,
                req.body
            );
            return apiResponse.updated(res, budget);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async deleteSavingsPlan(req, res) {
        try {
            const budget = await budgetService.deleteSavingsPlan(
                req.params.id,
                req.user.id,
                req.params.savingsId
            );
            return apiResponse.deleted(res, 'Savings plan deleted successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }
}

module.exports = new BudgetController();
