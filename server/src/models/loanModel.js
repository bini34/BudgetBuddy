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
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Paid'], 
    default: 'Pending' 
  },
  payoffDate: {
    type: Date, // Loan repayment due date
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Loan', loanSchema);
