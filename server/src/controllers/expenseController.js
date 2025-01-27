const expenseService = require('../services/expenseService');
const apiResponse = require('../utils/apiResponse');

class ExpenseController {
    // Create a new expense
    async createExpense(req, res) {
        try {
            const expenseData = {
                ...req.body,
            };
            const expense = await expenseService.createExpense(expenseData);
            return apiResponse.created(res, expense, 'Expense created successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    // Get all expenses
    async getAllExpenses(req, res) {
        try {
            const expenses = await expenseService.getAllExpenses(userId);
            return apiResponse.success(res, expenses, 'Expenses retrieved successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    // Get a single expense by ID
    async getExpenseById(req, res) {
        try {
            const expense = await expenseService.getExpenseById(req.params.id);
            return apiResponse.success(res, expense, 'Expense retrieved successfully');
        } catch (error) {
            if (error.message === 'Expense not found') {
                return apiResponse.notFound(res, error.message);
            }
            return apiResponse.error(res, error.message);
        }
    }

    // Update an expense by ID
    async updateExpense(req, res) {
        try {
            const expense = await expenseService.updateExpense(req.params.id, req.body);
            return apiResponse.updated(res, expense, 'Expense updated successfully');
        } catch (error) {
            if (error.message === 'Expense not found') {
                return apiResponse.notFound(res, error.message);
            }
            return apiResponse.error(res, error.message);
        }
    }

    // Delete an expense by ID
    async deleteExpense(req, res) {
        try {
            await expenseService.deleteExpense(req.params.id);
            return apiResponse.deleted(res, 'Expense deleted successfully');
        } catch (error) {
            if (error.message === 'Expense not found') {
                return apiResponse.notFound(res, error.message);
            }
            return apiResponse.error(res, error.message);
        }
    }

    // Get expenses by filters
    async getExpensesByFilters(req, res) {
        try {
            const filters = {
                userId: req.query.userId,
                category: req.query.category,
                subCategory: req.query.subCategory
            };
            
            const expenses = await expenseService.getExpensesByFilters(filters);
            return apiResponse.success(res, expenses, 'Filtered expenses retrieved successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }
}

module.exports = new ExpenseController();
