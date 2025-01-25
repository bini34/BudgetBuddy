const { body, param } = require('express-validator');
const { validate } = require('../middlewares/validate');

// Validation rules for creating/updating a budget
const budgetValidation = [
  body('month.year')
    .notEmpty()
    .withMessage('Year is required')
    .isInt({ min: 2000, max: 2100 })
    .withMessage('Year must be between 2000 and 2100'),

  body('month.month')
    .notEmpty()
    .withMessage('Month is required')
    .isInt({ min: 1, max: 12 })
    .withMessage('Month must be between 1 and 12'),

  body('incomeSources.*.name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Income source name is required')
    .isString()
    .withMessage('Income source name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Income source name must be between 2 and 50 characters'),

  body('incomeSources.*.amount')
    .optional()
    .isNumeric()
    .withMessage('Income amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Income amount cannot be negative'),

  body('expensePlanCategories.needs.*.name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Expense category name is required')
    .isString()
    .withMessage('Expense category name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Expense category name must be between 2 and 50 characters'),

  body('expensePlanCategories.needs.*.amount')
    .optional()
    .isNumeric()
    .withMessage('Expense amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Expense amount cannot be negative'),

  body('expensePlanCategories.wants.*.name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Expense category name is required')
    .isString()
    .withMessage('Expense category name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Expense category name must be between 2 and 50 characters'),

  body('expensePlanCategories.wants.*.amount')
    .optional()
    .isNumeric()
    .withMessage('Expense amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Expense amount cannot be negative'),

  body('expensePlanCategories.others.*.name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Expense category name is required')
    .isString()
    .withMessage('Expense category name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Expense category name must be between 2 and 50 characters'),

  body('expensePlanCategories.others.*.amount')
    .optional()
    .isNumeric()
    .withMessage('Expense amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Expense amount cannot be negative'),

  body('savingsPlan.*.name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Savings plan name is required')
    .isString()
    .withMessage('Savings plan name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Savings plan name must be between 2 and 50 characters'),

  body('savingsPlan.*.percentage')
    .optional()
    .isNumeric()
    .withMessage('Savings percentage must be a number')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Savings percentage must be between 0 and 100'),

  body('savingsPlan.*.amount')
    .optional()
    .isNumeric()
    .withMessage('Savings amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Savings amount cannot be negative'),
];

// Validation for adding/updating income source
const incomeSourceValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid budget ID format'),

  body('name')
    .trim()
    .notEmpty()
    .withMessage('Income source name is required')
    .isString()
    .withMessage('Income source name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Income source name must be between 2 and 50 characters'),

  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isNumeric()
    .withMessage('Amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Amount cannot be negative'),
];

// Validation for adding/updating expense category
const expenseCategoryValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid budget ID format'),

  param('type')
    .isIn(['needs', 'wants', 'others'])
    .withMessage('Expense type must be one of: needs, wants, others'),

  body('name')
    .trim()
    .notEmpty()
    .withMessage('Expense category name is required')
    .isString()
    .withMessage('Expense category name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Expense category name must be between 2 and 50 characters'),

  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isNumeric()
    .withMessage('Amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Amount cannot be negative'),
];

// Validation for adding/updating savings plan
const savingsPlanValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid budget ID format'),

  body('name')
    .trim()
    .notEmpty()
    .withMessage('Savings plan name is required')
    .isString()
    .withMessage('Savings plan name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Savings plan name must be between 2 and 50 characters'),

  body('percentage')
    .notEmpty()
    .withMessage('Percentage is required')
    .isNumeric()
    .withMessage('Percentage must be a number')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Percentage must be between 0 and 100'),

  body('amount')
    .optional()
    .isNumeric()
    .withMessage('Amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Amount cannot be negative'),
];

// Validation for getting budget by ID
const getBudgetValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid budget ID format'),
];

// Validation for getting budget by month
// const getBudgetByMonthValidation = [
//   // param('year')
//   //   .isInt({ min: 2000, max: 2100 })
//   //   .withMessage('Year must be between 2000 and 2100'),

//   // param('month')
//   //   .isInt({ min: 1, max: 12 })
//   //   .withMessage('Month must be between 1 and 12'),
// ];

const getUserBudgetCategoriesValidation = [
  param('userId')
    .isString()
    .notEmpty()
    .withMessage('User ID is required'),
];

module.exports = {
  budgetValidation,
  incomeSourceValidation,
  expenseCategoryValidation,
  savingsPlanValidation,
  getBudgetValidation,
  getUserBudgetCategoriesValidation,
  validate,
};


