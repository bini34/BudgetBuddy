const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: 'ETB' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Wallet', walletSchema);
