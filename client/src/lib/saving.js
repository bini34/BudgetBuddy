import Fetch from "./fetch";
import { getUser } from "./auth";
// Function to create a new saving goal
async function createSaving({ name, targetAmount, savingsAmount = 0 }) {
   const user = await getUser()
   console.log("user from saving", user)
    
    if (!name || !targetAmount) {
        throw new Error('Category and target amount are required');
    }

    try {
        const response = await Fetch('/saving', 'POST', {
            userId: user.id,
            name,
            targetAmount,
            savingsAmount
        });
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to get all savings for the logged-in user
async function getAllSavings() {
    const user = await getUser();
    const userId = user.id;
    
    try {
        const response = await Fetch(`/saving/${userId}`, 'GET');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to get a specific saving by ID
async function getSavingById(savingId) {
    const user = await getUser();
    const userId = user.id;
    try {
        const response = await Fetch(`/saving/${userId}/${savingId}`, 'GET');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to update a saving
async function updateSaving(savingId, updateData) {
    const user = await getUser();
    const userId = user.id;
    // Validate updateData fields
    const validFields = ['category', 'targetAmount', 'savingsAmount'];
    const updates = Object.keys(updateData).reduce((acc, key) => {
        if (validFields.includes(key)) {
            acc[key] = updateData[key];
        }
        return acc;
    }, {});

    try {
        const response = await Fetch(`/saving/${savingId}`, 'PUT', updates);
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to delete a saving
async function deleteSaving(savingId) {
    const user = await getUser();
    const userId = user.id;
    try {
        const response = await Fetch(`/saving/${userId}/${savingId}`, 'DELETE');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to get savings progress
async function getSavingsProgress() {
    const savedUserData = localStorage.getItem('user');
    const user = savedUserData && savedUserData !== 'undefined' ? JSON.parse(savedUserData) : null;
    
    try {
        const response = await Fetch(`/saving/progress/${user.id}`, 'GET');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to update savings amount
async function updateSavingsAmount(savingId, amount) {
    try {
        const saving = await getSavingById(savingId);
        const newSavingsAmount = saving.savingsAmount + amount;
        
        const response = await updateSaving(savingId, {
            savingsAmount: newSavingsAmount
        });
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Export the functions for use in other parts of the application
export {
    createSaving,
    getAllSavings,
    getSavingById,
    updateSaving,
    deleteSaving,
    getSavingsProgress,
    updateSavingsAmount
};
