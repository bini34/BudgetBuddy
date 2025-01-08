const loanService = require('../services/loanServices');
const apiResponse = require('../utils/apiResponse');

class LoanController {
  async createLoan(req, res) {
    try {
      const loan = await loanService.createLoan(req.body);
      apiResponse.created(res, loan);
    } catch (error) {
      apiResponse.badRequest(res, error.message);
    }
  }

  async getLoans(req, res) {
    try {
      const loans = await loanService.getLoans();
      apiResponse.success(res, loans);
    } catch (error) {
      apiResponse.error(res, error.message);
    }
  }

  async getLoanById(req, res) {
    try {
      const loan = await loanService.getLoanById(req.params.id);
      if (!loan) {
        return apiResponse.notFound(res, 'Loan not found');
      }
      apiResponse.success(res, loan);
    } catch (error) {
      apiResponse.error(res, error.message);
    }
  }

  async updateLoan(req, res) {
    try {
      const loan = await loanService.updateLoan(req.params.id, req.body);
      if (!loan) {
        return apiResponse.notFound(res, 'Loan not found');
      }
      apiResponse.updated(res, loan);
    } catch (error) {
      apiResponse.badRequest(res, error.message);
    }
  }

  async deleteLoan(req, res) {
    try {
      const loan = await loanService.deleteLoan(req.params.id);
      if (!loan) {
        return apiResponse.notFound(res, 'Loan not found');
      }
      apiResponse.deleted(res);
    } catch (error) {
      apiResponse.error(res, error.message);
    }
  }
}

module.exports = new LoanController();
