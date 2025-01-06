const express = require('express');
const incomeController = require('../controllers/incomeController');

const router = express.Router();

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

module.exports = router;
