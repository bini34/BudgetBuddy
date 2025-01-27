const loanService = require('../services/loanServices');
const apiResponse = require('../utils/apiResponse');

class LoanController {
  async createLoan(req, res) {
    try {
      const loanData = {
        ...req.body,
        userId: req.userId
      };
      const loan = await loanService.createLoan(loanData);
      return apiResponse.created(res, loan, 'Loan created successfully');
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  }

  async getLoans(req, res) {
    try {
      const { userId } = req.params;
      const loans = await loanService.getLoans(userId);
      return apiResponse.success(res, loans, 'Loans retrieved successfully');
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  }

  async getLoansByYear(req, res) {
    try {
      const { userId, year } = req.params;
      const loans = await loanService.getLoansByYear(userId, parseInt(year));
      return apiResponse.success(res, loans, 'Yearly loans retrieved successfully');
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  }

  async getLoansByMonth(req, res) {
    try {
      const { userId, year, month } = req.params;
      const loans = await loanService.getLoansByMonth(
        userId, 
        parseInt(year), 
        parseInt(month)
      );
      return apiResponse.success(res, loans, 'Monthly loans retrieved successfully');
    } catch (error) {
      return apiResponse.error(res, error.message);
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
