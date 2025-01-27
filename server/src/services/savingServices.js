const SavingRepository = require('../repositories/savingRepository');

class SavingService {
    constructor() {
        this.savingRepository = SavingRepository;
    }

    async createSaving(savingData) {
        if (!savingData.name) {
            throw new Error('Category is required');
        }
        if (savingData.targetAmount < 0) {
            throw new Error('Target amount cannot be negative');
        }
        return await this.savingRepository.create(savingData);
    }

    async getAllSavings(userId) {
        return await this.savingRepository.findAll(userId);
    }

    async getSavingById(id) {
        const saving = await this.savingRepository.findById(id);
        if (!saving) {
            throw new Error('Saving not found');
        }
        return saving;
    }

    async updateSaving(id, savingData) {
        if (savingData.targetAmount < 0) {
            throw new Error('Target amount cannot be negative');
        }
        if (savingData.savingsAmount < 0) {
            throw new Error('Savings amount cannot be negative');
        }
        
        const saving = await this.savingRepository.update(id, savingData);
        if (!saving) {
            throw new Error('Saving not found');
        }
        return saving;
    }

    async deleteSaving(id) {
        const saving = await this.savingRepository.delete(id);
        if (!saving) {
            throw new Error('Saving not found');
        }
        return saving;
    }

    async getSavingsProgress(userId) {
        const savings = await this.savingRepository.findAll(userId);
        
        const progress = savings.map(saving => ({
            category: saving.category,
            targetAmount: saving.targetAmount,
            currentAmount: saving.savingsAmount,
            percentage: saving.targetAmount > 0 
                ? (saving.savingsAmount / saving.targetAmount) * 100 
                : 0,
            remaining: saving.targetAmount - saving.savingsAmount
        }));

        const totalProgress = {
            totalTarget: savings.reduce((sum, saving) => sum + saving.targetAmount, 0),
            totalSaved: savings.reduce((sum, saving) => sum + saving.savingsAmount, 0),
            categories: progress
        };

        totalProgress.overallPercentage = totalProgress.totalTarget > 0 
            ? (totalProgress.totalSaved / totalProgress.totalTarget) * 100 
            : 0;

        return totalProgress;
    }
}

module.exports = new SavingService();
