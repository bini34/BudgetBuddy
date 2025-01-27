const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true, 
    trim: true,
  },
  targetAmount: {
    type: Number,
    default: 0, // Amount saved
  },
  savingsAmount: {
    type: Number,
    default: 0, // Amount saved
  },
}, { timestamps: { createdAt: true, updatedAt: true } });

module.exports = mongoose.model('Savings', savingsSchema);
