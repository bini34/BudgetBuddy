const IncomeRepository = require('../repositories/incomeRepository');

class IncomeService {
    constructor() {
        this.incomeRepository = IncomeRepository;
    }

    async createIncome(incomeData) {
        return await this.incomeRepository.create(incomeData);
    }

    async getAllIncomes(userId) {
        return await this.incomeRepository.findAll(userId);
    }

    async getIncomeById(id) {
        const income = await this.incomeRepository.findById(id);
        if (!income) {
            throw new Error('Income not found');
        }
        return income;
    }

    async updateIncome(id, incomeData) {
        const income = await this.incomeRepository.update(id, incomeData);
        if (!income) {
            throw new Error('Income not found');
        }
        return income;
    }

    async deleteIncome(id) {
        const income = await this.incomeRepository.delete(id);
        if (!income) {
            throw new Error('Income not found');
        }
        return income;
    }

    async getIncomeByYear(userId, year) {
        try {
            if (!userId) {
                throw new Error('User ID is required');
            }

            if (!year || isNaN(year)) {
                throw new Error('Valid year is required');
            }

            const yearlyIncome = await this.incomeRepository.findByYear(userId, year);
            
            // Group incomes by month
            const monthlyIncomes = this.groupIncomesByMonth(yearlyIncome);
            
            // Calculate yearly total
            const yearlyTotal = yearlyIncome.reduce((sum, income) => sum + income.amount, 0);

            return {
                year,
                yearlyTotal,
                monthlyBreakdown: monthlyIncomes
            };
        } catch (error) {
            throw error;
        }
    }

    groupIncomesByMonth(incomes) {
        const monthlyData = Array(12).fill(null).map(() => ({
            total: 0,
            sources: {}
        }));

        incomes.forEach(income => {
            const monthIndex = income.month - 1;
            
            // Add to monthly total
            monthlyData[monthIndex].total += income.amount;

            // Group by source
            if (!monthlyData[monthIndex].sources[income.source]) {
                monthlyData[monthIndex].sources[income.source] = {
                    total: 0,
                    incomes: []
                };
            }

            monthlyData[monthIndex].sources[income.source].total += income.amount;
            monthlyData[monthIndex].sources[income.source].incomes.push(income);
        });

        // Convert sources object to array and add month number
        return monthlyData.map((data, index) => ({
            month: index + 1,
            total: data.total,
            sources: Object.entries(data.sources).map(([source, details]) => ({
                source,
                total: details.total,
                incomes: details.incomes
            }))
        }));
    }
}

module.exports = new IncomeService();
