const Income = require('../models/incomeModel');

class IncomeRepository {
    async create(incomeData) {
        const income = new Income(incomeData);
        return await income.save();
    }

    async findAll(userId) {
        return await Income.find({ userId });
    }

    async findById(id) {
        return await Income.findById(id);
    }

    async update(id, incomeData) {
        return await Income.findByIdAndUpdate(
            id,
            incomeData,
            { new: true, runValidators: true }
        );
    }

    async delete(id) {
        return await Income.findByIdAndDelete(id);
    }

    async findByYear(userId, year) {
        try {
            return await Income.find({
                userId,
                year
            }).sort({ month: 1, createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new IncomeRepository();
