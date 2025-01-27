import Fetch from "./fetch";
import { getUser } from "./auth";
// Function to create a new loan
async function createLoan({ leanderName, amount, interestRate, payoffDate }) {
    const user = await getUser();
    if (!leanderName || !amount || !interestRate || !payoffDate) {
        throw new Error('All fields are required');
    }

    try {
        const response = await Fetch('/loan', 'POST', {
            userId: user.id,
            leanderName,
            amount,
            interestRate,
            payoffDate
        });
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to get all loans for a specific user
async function getUserLoans() {
    const user = await getUser();
    const userId = user.id;
    try {
        const response = await Fetch(`/loan/user/${userId}`, 'GET');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to get loans by year for a user
async function getLoansByYear(year) {
    const user = await getUser();
    const userId = user.id;
    try {
        const response = await Fetch(`/loan/year/${userId}/${year}`, 'GET');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to get loans by month for a user
async function getLoansByMonth(year, month) {
    const user = await getUser();
    const userId = user.id;
    try {
        const response = await Fetch(`/loan/month/${userId}/${year}/${month}`, 'GET');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to get a specific loan by ID
async function getLoan(loanId) {
    const user = await getUser();
    const userId = user.id;
    try {
        const response = await Fetch(`/loan/${userId}/${loanId}`, 'GET');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to update loan details
async function updateLoan(loanId, loanData) {
    const user = await getUser();
    const userId = user.id;
    try {
        const response = await Fetch(`/loan/${userId}/${loanId}`, 'PUT', loanData);
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to delete a loan
async function deleteLoan(loanId) {
    const user = await getUser();
    const userId = user.id;
    try {
        const response = await Fetch(`/loan/${userId}/${loanId}`, 'DELETE');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Export the functions for use in other parts of the application
export {
    createLoan,
    getUserLoans,
    getLoansByYear,
    getLoansByMonth,
    getLoan,
    updateLoan,
    deleteLoan
};
