const Loan = require('../models/loanModel');

class LoanRepository {
  // Base CRUD operations
  async create(loanData) {
    const loan = new Loan(loanData);
    return await loan.save();
  }

  async findById(id) {
    return await Loan.findById(id);
  }

  async update(id, loanData) {
    return await Loan.findByIdAndUpdate(
      id,
      loanData,
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    return await Loan.findByIdAndDelete(id);
  }

  // User specific operations
  async findAll(userId) {
    return await Loan.find({ userId })
      .sort({ createdAt: -1 });
  }

  // Time-based operations
  async findByYear(userId, year) {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);
    
    return await Loan.find({
      userId,
      startDate: { $gte: startDate, $lt: endDate }
    }).sort({ startDate: 1 });
  }

  async findByMonth(userId, year, month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    
    return await Loan.find({
      userId,
      startDate: { $gte: startDate, $lt: endDate }
    }).sort({ startDate: 1 });
  }
}

module.exports = new LoanRepository();
