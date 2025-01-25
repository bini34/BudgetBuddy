const WalletRepository = require('../repositories/walletRepository.js');

class WalletService {
  async createWallet(walletData) {
    try {
      const existingWallet = await WalletRepository.findByAccountNumber(walletData.accountNumber);
      if (existingWallet) {
        throw new Error('Account number already exists');
      }
      return await WalletRepository.create(walletData);
    } catch (error) {
      throw error;
    }
  }

  async getWalletById(id) {
    try {
      const wallet = await WalletRepository.findById(id);
      if (!wallet) {
        throw new Error('Wallet not found');
      }
      return wallet;
    } catch (error) {
      throw error;
    }
  }

  async getUserWallets(userId) {
    try {
      return await WalletRepository.findByUser(userId);
    } catch (error) {
      throw error;
    }
  }

  async updateWalletBalance(id, amount) {
    try {
      const wallet = await WalletRepository.findById(id);
      if (!wallet) {
        throw new Error('Wallet not found');
      }
      
      const newBalance = wallet.balance + amount;
      if (newBalance < 0) {
        throw new Error('Insufficient balance');
      }
      
      return await WalletRepository.updateBalance(id, amount);
    } catch (error) {
      throw error;
    }
  }

  async deleteWallet(id) {
    try {
      const wallet = await WalletRepository.delete(id);
      if (!wallet) {
        throw new Error('Wallet not found');
      }
      return wallet;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new WalletService();
