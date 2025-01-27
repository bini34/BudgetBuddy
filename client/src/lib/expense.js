import Fetch from "./fetch";
import { getUser } from "./auth";

// Function to create a new expense
async function createExpense(expenseData) {
    const user = await getUser();
    console.log("user from expense", user);
    
    if (!expenseData.category || !expenseData.subCategory || !expenseData.amount || !expenseData.month || !expenseData.year) {
        throw new Error('Required fields missing');
    }
    console.log("expenseData from expense", expenseData);

    const expenseWithUser = {
        ...expenseData,
        userId: user.id
    };

    try {
        const response = await Fetch('/expense', 'POST', expenseWithUser);
        return response;
    } catch (error) {
        console.error("Error creating expense:", error);
        throw error;
    }
}

// Function to get all expenses for the authenticated user
async function getAllExpenses() {
    try {
        const response = await Fetch('/expense', 'GET');
        return response;
    } catch (error) {
        console.error("Error fetching expenses:", error);
        throw error;
    }
}

// Function to get a specific expense by ID
async function getExpenseById(expenseId) {
    if (!expenseId) {
        throw new Error('Expense ID is required');
    }

    try {
        const response = await Fetch(`/expense/${expenseId}`, 'GET');
        return response;
    } catch (error) {
        console.error("Error fetching expense:", error);
        throw error;
    }
}

// Function to update an expense
async function updateExpense(expenseId, expenseData) {
    if (!expenseId) {
        throw new Error('Expense ID is required');
    }

    try {
        const response = await Fetch(`/expense/${expenseId}`, 'PUT', expenseData);
        return response;
    } catch (error) {
        console.error("Error updating expense:", error);
        throw error;
    }
}

// Function to delete an expense
async function deleteExpense(expenseId) {
    if (!expenseId) {
        throw new Error('Expense ID is required');
    }

    try {
        const response = await Fetch(`/expense/${expenseId}`, 'DELETE');
        return response;
    } catch (error) {
        console.error("Error deleting expense:", error);
        throw error;
    }
}

// Function to get expenses by category and subcategory
async function getExpensesByFilters(filters) {
    const user = await getUser();
    const { category, subCategory } = filters;
    
    try {
        let endpoint = '/expense/filter';
        const queryParams = new URLSearchParams({
            userId: user.id,
            ...(category !== 'all' && { category }),
            ...(subCategory && { subCategory })
        }).toString();
        
        const response = await Fetch(`${endpoint}?${queryParams}`, 'GET');
        return response;
    } catch (error) {
        console.error("Error fetching filtered expenses:", error);
        throw error;
    }
}

// Export all functions
export {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpensesByFilters
};
