const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const auth = require('../middlewares/auth');
const {
  budgetValidation,
  incomeSourceValidation,
  expenseCategoryValidation,
  savingsPlanValidation,
  getBudgetValidation,
  getBudgetByMonthValidation,
  getUserBudgetCategoriesValidation,
  validate,
} = require('../validation/budgetValidation');
router.use(auth);

// Create a new budget
router.post('/', auth, budgetValidation, validate, budgetController.createBudget);

// Get all budgets for the authenticated user
router.get('/', auth, budgetController.getUserBudgets);

// Get a specific budget by ID
router.get('/:id', auth, getBudgetValidation, validate, budgetController.getBudgetById);

// Get budget for specific month and year
// router.get('/:year/:month', auth, getBudgetByMonthValidation, validate, budgetController.getBudgetByMonth);

// Update a budget
router.put('/:id', auth, getBudgetValidation, budgetValidation, validate, budgetController.updateBudget);

// Delete a budget
router.delete('/:id', auth, getBudgetValidation, validate, budgetController.deleteBudget);

// Add income source to budget
router.post('/:id/income', auth, incomeSourceValidation, validate, budgetController.addIncomeSource);

// Update income source
router.put('/:id/income/:incomeId', auth, incomeSourceValidation, validate, budgetController.updateIncomeSource);

// Delete income source
router.delete('/:id/income/:incomeId', auth, getBudgetValidation, validate, budgetController.deleteIncomeSource);

// Add expense category
router.post('/:id/expense/:type', auth, expenseCategoryValidation, validate, budgetController.addExpenseCategory);

// Update expense category
router.put('/:id/expense/:type/:categoryId', auth, expenseCategoryValidation, validate, budgetController.updateExpenseCategory);

// Delete expense category
router.delete('/:id/expense/:type/:categoryId', auth, getBudgetValidation, validate, budgetController.deleteExpenseCategory);

// Add savings plan
router.post('/:id/savings', auth, savingsPlanValidation, validate, budgetController.addSavingsPlan);

// Update savings plan
router.put('/:id/savings/:savingsId', auth, savingsPlanValidation, validate, budgetController.updateSavingsPlan);

// Delete savings plan
router.delete('/:id/savings/:savingsId', auth, getBudgetValidation, validate, budgetController.deleteSavingsPlan);

// Get all budget categories for a user
router.get('/budget-categories/:userId', auth, getUserBudgetCategoriesValidation, validate, budgetController.getBudgetSubcategories);

module.exports = router;
