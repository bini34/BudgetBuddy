const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middlewares/auth');

// Get expenses by filters (this route should come before /:id route)
router.get('/filter', auth, expenseController.getExpensesByFilters);

// Create a new expense
router.post('/', auth, expenseController.createExpense);

// Get all expenses
router.get('/', auth, expenseController.getAllExpenses);

// Get a single expense by ID
router.get('/:id', auth, expenseController.getExpenseById);

// Update an expense by ID
router.put('/:id', auth, expenseController.updateExpense);

// Delete an expense by ID
router.delete('/:id', auth, expenseController.deleteExpense);

module.exports = router;
