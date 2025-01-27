class BudgetService {
    constructor(budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    async createBudget(userId, budgetData) {
        const budget = {
            ...budgetData,
            user: userId
        };
        return await this.budgetRepository.create(budget);
    }

    async getUserBudgets(userId) {
        return await this.budgetRepository.findByUser(userId);
    }

    async getBudgetById(budgetId, userId) {
        const budget = await this.budgetRepository.findById(budgetId);
        if (!budget || budget.user.toString() !== userId.toString()) {
            throw new Error('Budget not found or unauthorized');
        }
        return budget;
    }

    async getBudgetByMonth(userId, year, month) {
        return await this.budgetRepository.findByUserAndMonth(userId, year, month);
    }

    async updateBudget(budgetId, userId, updateData) {
        await this.getBudgetById(budgetId, userId); // Check authorization
        return await this.budgetRepository.update(budgetId, updateData);
    }

    async deleteBudget(budgetId, userId) {
        await this.getBudgetById(budgetId, userId); // Check authorization
        return await this.budgetRepository.delete(budgetId);
    }

    async addIncomeSource(budgetId, userId, incomeData) {
        await this.getBudgetById(budgetId, userId);
        return await this.budgetRepository.addIncomeSource(budgetId, incomeData);
    }

    async updateIncomeSource(budgetId, userId, incomeId, incomeData) {
        await this.getBudgetById(budgetId, userId);
        return await this.budgetRepository.updateIncomeSource(budgetId, incomeId, incomeData);
    }

    async deleteIncomeSource(budgetId, userId, incomeId) {
        await this.getBudgetById(budgetId, userId);
        return await this.budgetRepository.deleteIncomeSource(budgetId, incomeId);
    }

    async addExpenseCategory(budgetId, userId, type, categoryData) {
        if (!['needs', 'wants', 'others'].includes(type)) {
            throw new Error('Invalid expense category type');
        }
        await this.getBudgetById(budgetId, userId);
        return await this.budgetRepository.addExpenseCategory(budgetId, type, categoryData);
    }

    async updateExpenseCategory(budgetId, userId, type, categoryId, categoryData) {
        if (!['needs', 'wants', 'others'].includes(type)) {
            throw new Error('Invalid expense category type');
        }
        await this.getBudgetById(budgetId, userId);
        return await this.budgetRepository.updateExpenseCategory(budgetId, type, categoryId, categoryData);
    }

    async deleteExpenseCategory(budgetId, userId, type, categoryId) {
        if (!['needs', 'wants', 'others'].includes(type)) {
            throw new Error('Invalid expense category type');
        }
        await this.getBudgetById(budgetId, userId);
        return await this.budgetRepository.deleteExpenseCategory(budgetId, type, categoryId);
    }

    async addSavingsPlan(budgetId, userId, savingsData) {
        await this.getBudgetById(budgetId, userId);
        return await this.budgetRepository.addSavingsPlan(budgetId, savingsData);
    }

    async updateSavingsPlan(budgetId, userId, savingsId, savingsData) {
        await this.getBudgetById(budgetId, userId);
        return await this.budgetRepository.updateSavingsPlan(budgetId, savingsId, savingsData);
    }

    async deleteSavingsPlan(budgetId, userId, savingsId) {
        await this.getBudgetById(budgetId, userId);
        return await this.budgetRepository.deleteSavingsPlan(budgetId, savingsId);
    }

    async getBudgetSubcategories(userId) {
        try {
            const categories = await this.budgetRepository.getBudgetSubcategories(userId);
            
            // Transform the data to a more frontend-friendly format
            return {
                needs: categories.needs.map(cat => ({
                    id: cat._id,
                    name: cat.name,
                })),
                wants: categories.wants.map(cat => ({
                    id: cat._id,
                    name: cat.name,
                })),
                others: categories.others.map(cat => ({
                    id: cat._id,
                    name: cat.name,
                }))
            };
        } catch (error) {
            console.error('Error in getBudgetSubcategories service:', error);
            throw error;
        }
    }
}

const budgetRepository = require('../repositories/budgetRepository');
module.exports = new BudgetService(budgetRepository);
