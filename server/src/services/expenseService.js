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

    async getExpensesByFilters(filters) {
        try {
            const { userId, category, subCategory } = filters;

            console.log("filters", filters);

            if (!userId) {
                throw new Error('User ID is required');
            }

            const queryFilters = {
                userId,
            };

            if (category && category !== 'all') {
                queryFilters.category = category;
            }

            if (subCategory && subCategory !== 'all') {
                queryFilters.subCategory = subCategory;
            }

            const expenses = await this.expenseRepository.findByFilters(queryFilters);
            console.log("expenses from service of expenseService", expenses);
            // Group expenses by category and subcategory
            const groupedExpenses = this.groupExpensesByCategoryAndSubCategory(expenses);

            return groupedExpenses;

        } catch (error) {
            throw error;
        }
    }

    groupExpensesByCategoryAndSubCategory(expenses) {
        const groupedData = {};

        expenses.forEach(expense => {
            if (!groupedData[expense.category]) {
                groupedData[expense.category] = {
                    category: expense.category,
                    totalAmount: 0,
                    subCategories: {}
                };
            }

            if (!groupedData[expense.category].subCategories[expense.subCategory]) {
                groupedData[expense.category].subCategories[expense.subCategory] = {
                    name: expense.subCategory,
                    expenses: [],
                    totalAmount: 0
                };
            }

            groupedData[expense.category].subCategories[expense.subCategory].expenses.push(expense);
            groupedData[expense.category].subCategories[expense.subCategory].totalAmount += expense.amount;
            groupedData[expense.category].totalAmount += expense.amount;
        });

        // Convert to array format
        return Object.values(groupedData).map(category => ({
            ...category,
            subCategories: Object.values(category.subCategories)
        }));
    }
}

module.exports = new ExpenseService();
