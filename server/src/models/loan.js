const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  lender: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Paid'], default: 'Pending' },
  dueDate: { type: Date },
});

module.exports = mongoose.model('Loan', loanSchema);
