const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true, // e.g., "Needs", "Wants"
    trim: true,
  },
  subCategory: {
    type: String, // e.g., "Rent", "Grocery"
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
}, { timestamps: { createdAt: true, updatedAt: true } });
module.exports = mongoose.model('Expense', expenseSchema);
