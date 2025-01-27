import Fetch from "./fetch";
import {getUser} from "./auth";
// Create a new budget
async function createBudget(budgetData) {
        const user = await getUser();
        console.log("user from budget", user)

    const budgetdatawithuser = {...budgetData, userId: user.id};
    console.log("budgetDatawithuser", budgetdatawithuser);
    try {
        const response = await Fetch('/budget', 'POST', budgetdatawithuser);
        return response;
    } catch (error) {
        console.error("Error creating budget:", error);
        throw error;
    }
}

// Get all budgets for the authenticated user
async function getUserBudgets() {
    try {
        const response = await Fetch('/budget', 'GET');
        return response;
    } catch (error) {
        console.error("Error fetching user budgets:", error);
        throw error;
    }
}

// Get a specific budget by ID
async function getBudgetById(budgetId) {
    try {
        const response = await Fetch(`/budget/${budgetId}`, 'GET');
        return response;
    } catch (error) {
        console.error("Error fetching budget:", error);
        throw error;
    }
}

// Get budget for specific month and year
async function getBudgetByMonth(year, month) {
    try {
        const response = await Fetch(`/budget/${year}/${month}`, 'GET');
        return response;
    } catch (error) {
        console.error("Error fetching budget by month:", error);
        throw error;
    }
}

// Update a budget
async function updateBudget(budgetId, budgetData) {
    try {
        const response = await Fetch(`/budget/${budgetId}`, 'PUT', budgetData);
        return response;
    } catch (error) {
        console.error("Error updating budget:", error);
        throw error;
    }
}

// Delete a budget
async function deleteBudget(budgetId) {
    try {
        const response = await Fetch(`/budget/${budgetId}`, 'DELETE');
        return response;
    } catch (error) {
        console.error("Error deleting budget:", error);
        throw error;
    }
}

// Income source operations
async function addIncomeSource(budgetId, incomeData) {
    try {
        const response = await Fetch(`/budget/${budgetId}/income`, 'POST', incomeData);
        return response;
    } catch (error) {
        console.error("Error adding income source:", error);
        throw error;
    }
}

async function updateIncomeSource(budgetId, incomeId, incomeData) {
    try {
        const response = await Fetch(`/budget/${budgetId}/income/${incomeId}`, 'PUT', incomeData);
        return response;
    } catch (error) {
        console.error("Error updating income source:", error);
        throw error;
    }
}

async function deleteIncomeSource(budgetId, incomeId) {
    try {
        const response = await Fetch(`/budget/${budgetId}/income/${incomeId}`, 'DELETE');
        return response;
    } catch (error) {
        console.error("Error deleting income source:", error);
        throw error;
    }
}

// Expense category operations
async function addExpenseCategory(budgetId, type, expenseData) {
    try {
        const response = await Fetch(`/budget/${budgetId}/expense/${type}`, 'POST', expenseData);
        return response;
    } catch (error) {
        console.error("Error adding expense category:", error);
        throw error;
    }
}

async function updateExpenseCategory(budgetId, type, categoryId, expenseData) {
    try {
        const response = await Fetch(`/budget/${budgetId}/expense/${type}/${categoryId}`, 'PUT', expenseData);
        return response;
    } catch (error) {
        console.error("Error updating expense category:", error);
        throw error;
    }
}

async function deleteExpenseCategory(budgetId, type, categoryId) {
    try {
        const response = await Fetch(`/budget/${budgetId}/expense/${type}/${categoryId}`, 'DELETE');
        return response;
    } catch (error) {
        console.error("Error deleting expense category:", error);
        throw error;
    }
}

// Savings plan operations
async function addSavingsPlan(budgetId, savingsData) {
    try {
        const response = await Fetch(`/budget/${budgetId}/savings`, 'POST', savingsData);
        return response;
    } catch (error) {
        console.error("Error adding savings plan:", error);
        throw error;
    }
}

async function updateSavingsPlan(budgetId, savingsId, savingsData) {
    try {
        const response = await Fetch(`/budget/${budgetId}/savings/${savingsId}`, 'PUT', savingsData);
        return response;
    } catch (error) {
        console.error("Error updating savings plan:", error);
        throw error;
    }
}

async function deleteSavingsPlan(budgetId, savingsId) {
    try {
        const response = await Fetch(`/budget/${budgetId}/savings/${savingsId}`, 'DELETE');
        return response;
    } catch (error) {
        console.error("Error deleting savings plan:", error);
        throw error;
    }
}

// Get budget subcategories by type
async function getBudgetSubcategories() {
    const user = await getUser();
    const userId = user.id;
    try {
        const response = await Fetch(`/budget/budget-categories/${userId}`, 'GET');
        return response;
    } catch (error) {
        console.error("Error fetching budget subcategories:", error);
        throw error;
    }
}

export {
    createBudget,
    getUserBudgets,
    getBudgetById,
    getBudgetByMonth,
    updateBudget,
    deleteBudget,
    addIncomeSource,
    updateIncomeSource,
    deleteIncomeSource,
    addExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
    addSavingsPlan,
    updateSavingsPlan,
    deleteSavingsPlan,
    getBudgetSubcategories
};
