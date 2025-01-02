
import Fetch from "./fetch";

// Function to handle user registration
async function registerUser(email, password) {
    const endpoint = '/api/register'; // Replace with your actual endpoint
    return Fetch(endpoint, 'POST', { email, password });
}

// Function to handle user sign-in
async function signInUser(email, password) {
    const endpoint = '/api/signin'; // Replace with your actual endpoint
    return Fetch(endpoint, 'POST', { email, password });
}

// Function to handle password reset
async function forgotPassword(email) {
    const endpoint = '/api/forgot-password'; // Replace with your actual endpoint
    return Fetch(endpoint, 'POST', { email });
}

// Export the functions for use in other parts of the application
export { registerUser, signInUser, forgotPassword };
