const Expense = require('../models/expenseModel');

class ExpenseRepository {
    async create(expenseData) {
        console.log("expenseData", expenseData);
        const expense = new Expense(expenseData);
        return await expense.save();
    }

    async findAll(userId) {
        return await Expense.find({ userId });
    }

    async findById(id) {
        return await Expense.findById(id);
    }

    async update(id, expenseData) {
        return await Expense.findByIdAndUpdate(
            id,
            expenseData,
            { new: true, runValidators: true }
        );
    }

    async delete(id) {
        return await Expense.findByIdAndDelete(id);
    }

    async findByFilters(filters) {
        try {
            const expenses = await Expense.find(filters)
                .sort({ createdAt: -1 });
            return expenses;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ExpenseRepository();
