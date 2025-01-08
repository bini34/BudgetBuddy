const ExpenseRepository = require('../repositories/expenseRepository');

class ExpenseService {
    constructor() {
        this.expenseRepository = ExpenseRepository;
    }

    async createExpense(expenseData) {
        return await this.expenseRepository.create(expenseData);
    }

    async getAllExpenses(userId) {
        return await this.expenseRepository.findAll(userId);
    }

    async getExpenseById(id) {
        const expense = await this.expenseRepository.findById(id);
        if (!expense) {
            throw new Error('Expense not found');
        }
        return expense;
    }

    async updateExpense(id, expenseData) {
        const expense = await this.expenseRepository.update(id, expenseData);
        if (!expense) {
            throw new Error('Expense not found');
        }
        return expense;
    }

    async deleteExpense(id) {
        const expense = await this.expenseRepository.delete(id);
        if (!expense) {
            throw new Error('Expense not found');
        }
        return expense;
    }
}

module.exports = new ExpenseService();
