const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Create a new budget
router.post('/', authenticateToken, budgetController.createBudget);

// Get all budgets for the authenticated user
router.get('/', authenticateToken, budgetController.getUserBudgets);

// Get a specific budget by ID
router.get('/:id', authenticateToken, budgetController.getBudgetById);

// Get budget for specific month and year
router.get('/:year/:month', authenticateToken, budgetController.getBudgetByMonth);

// Update a budget
router.put('/:id', authenticateToken, budgetController.updateBudget);

// Delete a budget
router.delete('/:id', authenticateToken, budgetController.deleteBudget);

// Add income source to budget
router.post('/:id/income', authenticateToken, budgetController.addIncomeSource);

// Update income source
router.put('/:id/income/:incomeId', authenticateToken, budgetController.updateIncomeSource);

// Delete income source
router.delete('/:id/income/:incomeId', authenticateToken, budgetController.deleteIncomeSource);

// Add expense category
router.post('/:id/expense/:type', authenticateToken, budgetController.addExpenseCategory);

// Update expense category
router.put('/:id/expense/:type/:categoryId', authenticateToken, budgetController.updateExpenseCategory);

// Delete expense category
router.delete('/:id/expense/:type/:categoryId', authenticateToken, budgetController.deleteExpenseCategory);

// Add savings plan
router.post('/:id/savings', authenticateToken, budgetController.addSavingsPlan);

// Update savings plan
router.put('/:id/savings/:savingsId', authenticateToken, budgetController.updateSavingsPlan);

// Delete savings plan
router.delete('/:id/savings/:savingsId', authenticateToken, budgetController.deleteSavingsPlan);

module.exports = router;
