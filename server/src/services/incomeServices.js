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
}

module.exports = new IncomeService();
