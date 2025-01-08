const Loan = require('../models/LoanModel');

class LoanRepository {
  async createLoan(loanData) {
    const loan = new Loan(loanData);
    return await loan.save();
  }

  async getLoans() {
    return await Loan.find();
  }

  async getLoanById(id) {
    return await Loan.findById(id);
  }

  async updateLoan(id, loanData) {
    return await Loan.findByIdAndUpdate(id, loanData, { new: true, runValidators: true });
  }

  async deleteLoan(id) {
    return await Loan.findByIdAndDelete(id);
  }
}

module.exports = new LoanRepository();
