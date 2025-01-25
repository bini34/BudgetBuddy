const express = require('express');
const router = express.Router();
const WalletController = require('../controllers/walletController');
const auth = require('../middlewares/auth'); // Assuming you have authentication middleware
const {
  createWalletValidation,
  updateBalanceValidation,
  getWalletValidation,
  getUserWalletsValidation,
  validate
} = require('../validation/walletValidation');

// Create a new wallet
router.post('/', auth, createWalletValidation, validate, WalletController.createWallet);

// Get a specific wallet
router.get('/:id', auth, getWalletValidation, validate, WalletController.getWallet);

// Get all wallets for a user
router.get('/user/:userId', auth, getUserWalletsValidation, validate, WalletController.getUserWallets);

// Update wallet balance
router.patch('/:id/balance', auth, updateBalanceValidation, validate, WalletController.updateBalance);

// Delete a wallet
router.delete('/:id', auth, getWalletValidation, validate, WalletController.deleteWallet);

module.exports = router;
