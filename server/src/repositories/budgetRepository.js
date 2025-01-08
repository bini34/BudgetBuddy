const Budget = require('../models/budgetModel');

class BudgetRepository {
    async create(budgetData) {
        const budget = new Budget(budgetData);
        return await budget.save();
    }

    async findById(id) {
        return await Budget.findById(id);
    }

    async findByUserAndMonth(userId, year, month) {
        return await Budget.findOne({
            user: userId,
            'month.year': year,
            'month.month': month
        });
    }

    async findByUser(userId) {
        return await Budget.find({ user: userId }).sort({ 'month.year': -1, 'month.month': -1 });
    }

    async update(id, updateData) {
        return await Budget.findByIdAndUpdate(id, updateData, { new: true });
    }

    async delete(id) {
        return await Budget.findByIdAndDelete(id);
    }

    async addIncomeSource(budgetId, incomeData) {
        return await Budget.findByIdAndUpdate(
            budgetId,
            { $push: { incomeSources: incomeData } },
            { new: true }
        );
    }

    async updateIncomeSource(budgetId, incomeId, incomeData) {
        return await Budget.findOneAndUpdate(
            { _id: budgetId, 'incomeSources._id': incomeId },
            { $set: { 'incomeSources.$': incomeData } },
            { new: true }
        );
    }

    async deleteIncomeSource(budgetId, incomeId) {
        return await Budget.findByIdAndUpdate(
            budgetId,
            { $pull: { incomeSources: { _id: incomeId } } },
            { new: true }
        );
    }

    async addExpenseCategory(budgetId, type, categoryData) {
        const updateField = `expensePlanCategories.${type}`;
        return await Budget.findByIdAndUpdate(
            budgetId,
            { $push: { [updateField]: categoryData } },
            { new: true }
        );
    }

    async updateExpenseCategory(budgetId, type, categoryId, categoryData) {
        const updateField = `expensePlanCategories.${type}.$`;
        return await Budget.findOneAndUpdate(
            { 
                _id: budgetId,
                [`expensePlanCategories.${type}._id`]: categoryId 
            },
            { $set: { [updateField]: categoryData } },
            { new: true }
        );
    }

    async deleteExpenseCategory(budgetId, type, categoryId) {
        const updateField = `expensePlanCategories.${type}`;
        return await Budget.findByIdAndUpdate(
            budgetId,
            { $pull: { [updateField]: { _id: categoryId } } },
            { new: true }
        );
    }

    async addSavingsPlan(budgetId, savingsData) {
        return await Budget.findByIdAndUpdate(
            budgetId,
            { $push: { savingsPlan: savingsData } },
            { new: true }
        );
    }

    async updateSavingsPlan(budgetId, savingsId, savingsData) {
        return await Budget.findOneAndUpdate(
            { _id: budgetId, 'savingsPlan._id': savingsId },
            { $set: { 'savingsPlan.$': savingsData } },
            { new: true }
        );
    }

    async deleteSavingsPlan(budgetId, savingsId) {
        return await Budget.findByIdAndUpdate(
            budgetId,
            { $pull: { savingsPlan: { _id: savingsId } } },
            { new: true }
        );
    }
}

module.exports = new BudgetRepository();
