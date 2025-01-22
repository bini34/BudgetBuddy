const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  currency: { type: String, default: 'ETB' },
  balance: { type: Number, default: 0 },
}, { timestamps: { createdAt: true, updatedAt: true } });
module.exports = mongoose.model('Wallet', walletSchema);
