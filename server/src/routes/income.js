const express = require('express');
const incomeController = require('../controllers/incomeController');
const auth = require('../middlewares/auth');

const router = express.Router();

// Protect all routes with authentication

// Add income
router.post('/', incomeController.addIncome);

// Get all incomes for a user
router.get('/:userId', incomeController.getAllIncomes);

// Get income by ID
router.get('/details/:incomeId', incomeController.getIncomeById);

// Update income
router.put('/:incomeId', incomeController.updateIncome);

// Delete income
router.delete('/:incomeId', incomeController.deleteIncome);

// Get income by year
router.get('/year/:userId/:year', incomeController.getIncomeByYear);

module.exports = router;
