import Fetch from "./fetch";
import { getUser } from "./auth";
// Function to add new income
async function addIncome(income) {
    const user = await getUser();
    console.log("income from add income", income);
    // if (!income.source || !income.amount || !income.month || !income.year) {
    //     throw new Error('Source, amount, month, and year are required');
    // }

    try {
        const response = await Fetch('/income', 'POST', {
            userId: user.id,
            ...income
        });
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to get all incomes for a user
async function getUserIncomes() {
    const user = await getUser();
    try {
        const response = await Fetch(`/income/${user.id}`, 'GET');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}
async function getIncomeByYear(year) {
   const user = await getUser();
   const userId = user.id;
    try {
        const response = await Fetch(`/income/year/${userId}/${year}`, 'GET');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to get income by ID
async function getIncome(incomeId) {
    try {
        const response = await Fetch(`/income/details/${incomeId}`, 'GET');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to update income
async function updateIncome(incomeId, { source, amount, month, year }) {
    try {
        const response = await Fetch(`/income/${incomeId}`, 'PUT', {
            source,
            amount,
            month,
            year
        });
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to delete income
async function deleteIncome(incomeId) {
    try {
        const response = await Fetch(`/income/${incomeId}`, 'DELETE');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

export {
    addIncome,
    getUserIncomes,
    getIncomeByYear,
    getIncome,
    updateIncome,
    deleteIncome
};
