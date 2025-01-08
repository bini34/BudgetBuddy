const loanRepository = require('../repositories/loanRepository');

class LoanService {
  async createLoan(loanData) {
    return await loanRepository.createLoan(loanData);
  }

  async getLoans() {
    return await loanRepository.getLoans();
  }

  async getLoanById(id) {
    return await loanRepository.getLoanById(id);
  }

  async updateLoan(id, loanData) {
    return await loanRepository.updateLoan(id, loanData);
  }

  async deleteLoan(id) {
    return await loanRepository.deleteLoan(id);
  }
}

module.exports = new LoanService();
