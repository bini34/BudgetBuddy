const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  leanderName: {
    type: String,
    required: true, // Loan name or lender
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  payoffDate: {
    type: Date, // Loan repayment due date
    required: true,
  },
}, { timestamps: { createdAt: true, updatedAt: true } });

module.exports = mongoose.model('Loan', loanSchema);
