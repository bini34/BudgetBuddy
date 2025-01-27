import Fetch from "./fetch";
import { getUser } from "./auth";
// Function to get dashboard cards data for a user
async function getDashboardCards() {
    const user = await getUser();
    const userId = user.id;
    try {
        const response = await Fetch(`/report/cards/${userId}`, 'GET');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Function to get dashboard cards data for a specific month
async function getDashboardCardsByMonth(year, month) {
    const user = await getUser();
    const userId = user.id;
    
    try {
        const response = await Fetch(`/cards/${userId}/${year}/${month}`, 'GET');
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// Export the functions for use in other parts of the application
export {
    getDashboardCards,
    getDashboardCardsByMonth
};
