const WalletService = require('../services/walletService');
const apiResponse = require('../utils/apiResponse');

class WalletController {
  async createWallet(req, res) {
    try {
      const wallet = await WalletService.createWallet(req.body);
      return apiResponse.created(res, wallet, 'Wallet created successfully');
    } catch (error) {
      return apiResponse.badRequest(res, error.message);
    }
  }

  async getWallet(req, res) {
    try {
      const wallet = await WalletService.getWalletById(req.params.id);
      return apiResponse.success(res, wallet, 'Wallet retrieved successfully');
    } catch (error) {
      return apiResponse.notFound(res, error.message);
    }
  }

  async getUserWallets(req, res) {
    try {
      const wallets = await WalletService.getUserWallets(req.params.userId);
      return apiResponse.success(res, wallets, 'User wallets retrieved successfully');
    } catch (error) {
      return apiResponse.badRequest(res, error.message);
    }
  }

  async updateBalance(req, res) {
    try {
      const { amount } = req.body;
      const wallet = await WalletService.updateWalletBalance(req.params.id, amount);
      return apiResponse.updated(res, wallet, 'Wallet balance updated successfully');
    } catch (error) {
      return apiResponse.badRequest(res, error.message);
    }
  }

  async deleteWallet(req, res) {
    try {
      await WalletService.deleteWallet(req.params.id);
      return apiResponse.deleted(res, 'Wallet deleted successfully');
    } catch (error) {
      return apiResponse.notFound(res, error.message);
    }
  }
}

module.exports = new WalletController();
