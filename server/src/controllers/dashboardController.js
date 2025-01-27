const dashboardService = require('../services/dashboardServices');
const apiResponse = require('../utils/apiResponse');

class DashboardController {
    async getDashboardCards(req, res) {
        try {
            const { userId } = req.params;
            const dashboardData = await dashboardService.getDashboardCards(userId);
            return apiResponse.success(res, dashboardData, 'Dashboard data retrieved successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async getDashboardCardsByMonth(req, res) {
        try {
            const { userId, year, month } = req.params;
            const dashboardData = await dashboardService.getDashboardCardsByMonth(
                userId,
                parseInt(year),
                parseInt(month)
            );
            return apiResponse.success(res, dashboardData, 'Monthly dashboard data retrieved successfully');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }
}

module.exports = new DashboardController();
