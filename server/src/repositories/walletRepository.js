const Wallet = require('../models/walletModel');

class WalletRepository {
  async create(walletData) {
    return await Wallet.create(walletData);
  }

  async findById(id) {
    return await Wallet.findById(id);
  }

  async findByUser(userId) {
    return await Wallet.find({ userId });
  }

  async findByAccountNumber(accountNumber) {
    return await Wallet.findOne({ accountNumber });
  }

  async updateBalance(id, amount) {
    return await Wallet.findByIdAndUpdate(
      id,
      { $inc: { balance: amount } },
      { new: true }
    );
  }

  async delete(id) {
    return await Wallet.findByIdAndDelete(id);
  }
}

module.exports = new WalletRepository();
