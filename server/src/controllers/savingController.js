const savingService = require('../services/savingServices');
const apiResponse = require('../utils/apiResponse');

class SavingController {
    async createSaving(req, res) {
        try {
            const savingData = {
                ...req.body,
            };
            const saving = await savingService.createSaving(savingData);
            return apiResponse.created(res, saving, 'Saving goal created successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async getAllSavings(req, res) {
        try {
            const savings = await savingService.getAllSavings(req.userId);
            return apiResponse.success(res, savings, 'Savings retrieved successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async getSavingById(req, res) {
        try {
            const saving = await savingService.getSavingById(req.params.id);
            return apiResponse.success(res, saving, 'Saving retrieved successfully');
        } catch (error) {
            if (error.message === 'Saving not found') {
                return apiResponse.notFound(res, error.message);
            }
            return apiResponse.error(res, error.message);
        }
    }

    async updateSaving(req, res) {
        try {
            const saving = await savingService.updateSaving(req.params.id, req.body);
            return apiResponse.success(res, saving, 'Saving updated successfully');
        } catch (error) {
            if (error.message === 'Saving not found') {
                return apiResponse.notFound(res, error.message);
            }
            return apiResponse.error(res, error.message);
        }
    }

    async deleteSaving(req, res) {
        try {
            await savingService.deleteSaving(req.params.id);
            return apiResponse.deleted(res, 'Saving deleted successfully');
        } catch (error) {
            if (error.message === 'Saving not found') {
                return apiResponse.notFound(res, error.message);
            }
            return apiResponse.error(res, error.message);
        }
    }

    async getSavingsProgress(req, res) {
        try {
            const progress = await savingService.getSavingsProgress(req.userId);
            return apiResponse.success(res, progress, 'Savings progress retrieved successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }
}

module.exports = new SavingController();
