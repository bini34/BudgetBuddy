const IncomeRepository = require('../repositories/incomeRepository');
const ExpenseRepository = require('../repositories/expenseRepository');
const SavingRepository = require('../repositories/savingRepository');

class DashboardService {
    constructor() {
        this.incomeRepository = IncomeRepository;
        this.expenseRepository = ExpenseRepository;
        this.savingRepository = SavingRepository;
    }

    async getDashboardCards(userId) {
        try {
            // Get all financial data
            const [incomes, expenses, savings] = await Promise.all([
                this.incomeRepository.findAll(userId),
                this.expenseRepository.findAll(userId),
                this.savingRepository.findAll(userId)
            ]);

            // Calculate totals
            const totalIncome = this.calculateTotal(incomes);
            const totalExpenses = this.calculateTotal(expenses);
            const totalSavings = this.calculateSavingsTotal(savings);
            const remainingBudget = totalIncome - totalExpenses - totalSavings;

            return this.formatDashboardData(
                totalIncome,
                totalExpenses,
                totalSavings,
                remainingBudget
            );
        } catch (error) {
            throw new Error('Error fetching dashboard data: ' + error.message);
        }
    }

    async getDashboardCardsByMonth(userId, year, month) {
        try {
            // Get monthly financial data
            const [incomes, expenses, savings] = await Promise.all([
                this.incomeRepository.findByMonth(userId, year, month),
                this.expenseRepository.findByMonth(userId, year, month),
                this.savingRepository.findAll(userId) // Savings might be tracked differently
            ]);

            // Calculate monthly totals
            const monthlyIncome = this.calculateTotal(incomes);
            const monthlyExpenses = this.calculateTotal(expenses);
            const monthlySavings = this.calculateSavingsTotal(savings);
            const monthlyRemainingBudget = monthlyIncome - monthlyExpenses - monthlySavings;

            return this.formatDashboardData(
                monthlyIncome,
                monthlyExpenses,
                monthlySavings,
                monthlyRemainingBudget
            );
        } catch (error) {
            throw new Error('Error fetching monthly dashboard data: ' + error.message);
        }
    }

    calculateTotal(items) {
        return items.reduce((sum, item) => sum + (item.amount || 0), 0);
    }

    calculateSavingsTotal(savings) {
        return savings.reduce((sum, saving) => sum + (saving.savingsAmount || 0), 0);
    }

    formatDashboardData(income, expenses, savings, remainingBudget) {
        return [
            {
                icon: 'DollarSign',
                title: 'Income',
                value: this.formatCurrency(income)
            },
            {
                icon: 'CreditCard',
                title: 'Expenses',
                value: this.formatCurrency(expenses)
            },
            {
                icon: 'PiggyBank',
                title: 'Savings',
                value: this.formatCurrency(savings)
            },
            {
                icon: 'PieChart',
                title: 'Remaining Budget',
                value: this.formatCurrency(remainingBudget)
            }
        ];
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'ETB',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }
}

module.exports = new DashboardService();
