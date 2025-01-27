const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middlewares/auth');

// Get dashboard data
router.get('/cards/:userId', auth, dashboardController.getDashboardCards);

// Get detailed dashboard data with date range
router.get('/cards/:userId/:year/:month', auth, dashboardController.getDashboardCardsByMonth);

module.exports = router;
