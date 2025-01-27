const Saving = require('../models/savingModel');

class SavingRepository {
    async create(savingData) {
        const saving = new Saving(savingData);
        return await saving.save();
    }

    async findAll(userId) {
        return await Saving.find({ userId }).sort({ createdAt: -1 });
    }

    async findById(id) {
        return await Saving.findById(id);
    }

    async update(id, savingData) {
        return await Saving.findByIdAndUpdate(
            id,
            savingData,
            { new: true, runValidators: true }
        );
    }

    async delete(id) {
        return await Saving.findByIdAndDelete(id);
    }
}

module.exports = new SavingRepository();
