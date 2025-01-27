import Fetch from "./fetch";
import getCookie from './getcookie';
// Function to create a new wallet
async function createWallet({ bankName, accountNumber, initialBalance, currency }) {
    const savedUserData = localStorage.getItem('user');
    const user = savedUserData && savedUserData !== 'undefined' ? JSON.parse(savedUserData) : null;
    
    console.log("walletData", { userId: user.id, bankName, accountNumber, initialBalance, currency });
    
    if(!bankName || !accountNumber || !initialBalance || !currency){
        throw new Error('All fields are required');
    }

    try {
        const response = await Fetch('/wallet', 'POST', { userId: user.id, bankName, accountNumber, balance: initialBalance, currency });
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to get a specific wallet by ID
async function getWallet(walletId) {
    try {
        const response = await Fetch(`/wallet/${walletId}`, 'GET');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to get all wallets for a specific user
async function getUserWallets() {
    const savedUserData = localStorage.getItem('user');
    const user = savedUserData && savedUserData !== 'undefined' ? JSON.parse(savedUserData) : null;
    try {
        const response = await Fetch(`/wallet/user/${user.id}`, 'GET');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to update wallet balance
async function updateWalletBalance(walletId, balanceData) {
    try {
        const response = await Fetch(`/wallet/${walletId}/balance`, 'PATCH', balanceData);
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to delete a wallet
async function deleteWallet(walletId) {
    try {
        const response = await Fetch(`/wallet/${walletId}`, 'DELETE');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Export the functions for use in other parts of the application
export { 
    createWallet,
    getWallet,
    getUserWallets,
    updateWalletBalance,
    deleteWallet
};
