const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true, // e.g., "Emergency Fund"
    trim: true,
  },
  percentage: {
    type: Number,
    required: true, // Percentage allocation (0-100)
  },
  amount: {
    type: Number,
    default: 0, // Amount saved
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Savings', savingsSchema);
