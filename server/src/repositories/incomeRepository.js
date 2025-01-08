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
}

module.exports = new IncomeRepository();
