const { body, param } = require('express-validator');
const { validate } = require('../middlewares/validate');

// Validation rules for creating a wallet
const createWalletValidation = [
    body('userId').trim().notEmpty().withMessage('User ID is required').isMongoId().withMessage('Invalid user ID format'),

  body('bankName').trim().notEmpty().withMessage('Bank name is required').isString().withMessage('Bank name must be a string'),
  body('accountNumber').trim().notEmpty().withMessage('Account number is required').isString().withMessage('Account number must be a string').matches(/^[0-9]+$/).withMessage('Account number must contain only numbers'),
    
  body('currency').optional().isString().withMessage('Currency must be a string').isLength({ min: 3, max: 3 }).withMessage('Currency must be a 3-letter code').default('ETB'),

  body('balance').optional().isNumeric().withMessage('Balance must be a number').isFloat({ min: 0 }).withMessage('Balance cannot be negative').default(0),

];

// Validation rules for updating wallet balance
const updateBalanceValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid wallet ID format'),
    
  body('balance')
    .notEmpty()
    .withMessage('Balance is required')
    .isNumeric()
    .withMessage('Balance must be a number')
    .isFloat({ min: 0 })
    .withMessage('Balance cannot be negative'),
];

// Validation rules for getting a specific wallet
const getWalletValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid wallet ID format'),
];

// Validation rules for getting user wallets
const getUserWalletsValidation = [
  param('userId')
    .isMongoId()
    .withMessage('Invalid user ID format'),
];

module.exports = {
  createWalletValidation,
  updateBalanceValidation,
  getWalletValidation,
  getUserWalletsValidation,
  validate,
};
