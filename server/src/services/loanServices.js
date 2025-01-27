const LoanRepository = require('../repositories/loanRepository');

class LoanService {
    constructor() {
        this.loanRepository = LoanRepository;
    }

    // Base CRUD operations
    async createLoan(loanData) {
        this.validateLoanData(loanData);
        return await this.loanRepository.create(loanData);
    }

    async getLoanById(id) {
        const loan = await this.loanRepository.findById(id);
        if (!loan) throw new Error('Loan not found');
        return loan;
    }

    async updateLoan(id, loanData) {
        this.validateLoanData(loanData);
        const loan = await this.loanRepository.update(id, loanData);
        if (!loan) throw new Error('Loan not found');
        return loan;
    }

    async deleteLoan(id) {
        const loan = await this.loanRepository.delete(id);
        if (!loan) throw new Error('Loan not found');
        return loan;
    }

    // User specific operations
    async getLoans(userId) {
        return await this.loanRepository.findAll(userId);
    }

    async getLoanStats(userId) {
        const loans = await this.loanRepository.findAll(userId);
        return this.calculateLoanStats(loans);
    }

    // Time-based operations
    async getLoansByYear(userId, year) {
        const loans = await this.loanRepository.findByYear(userId, year);
        return this.groupLoansByMonth(loans);
    }

    async getLoansByMonth(userId, year, month) {
        return await this.loanRepository.findByMonth(userId, year, month);
    }

    // Helper methods
    validateLoanData(loanData) {
        if (!loanData.amount || loanData.amount <= 0) {
            throw new Error('Invalid loan amount');
        }
        if (!loanData.loanType) {
            throw new Error('Loan type is required');
        }
        if (!loanData.startDate || !loanData.endDate) {
            throw new Error('Loan dates are required');
        }
    }

    calculateLoanStats(loans) {
        return {
            totalLoans: loans.length,
            totalAmount: loans.reduce((sum, loan) => sum + loan.amount, 0),
            activeLoans: loans.filter(loan => !loan.isCompleted).length,
            completedLoans: loans.filter(loan => loan.isCompleted).length,
            byType: this.groupLoansByType(loans)
        };
    }

    groupLoansByType(loans) {
        const groupedLoans = {};
        loans.forEach(loan => {
            if (!groupedLoans[loan.loanType]) {
                groupedLoans[loan.loanType] = {
                    count: 0,
                    totalAmount: 0
                };
            }
            groupedLoans[loan.loanType].count++;
            groupedLoans[loan.loanType].totalAmount += loan.amount;
        });
        return groupedLoans;
    }

    groupLoansByMonth(loans) {
        const monthlyLoans = Array(12).fill().map(() => ({
            count: 0,
            totalAmount: 0,
            loans: []
        }));

        loans.forEach(loan => {
            const month = new Date(loan.startDate).getMonth();
            monthlyLoans[month].count++;
            monthlyLoans[month].totalAmount += loan.amount;
            monthlyLoans[month].loans.push(loan);
        });

        return monthlyLoans;
    }
}

module.exports = new LoanService();