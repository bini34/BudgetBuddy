
import Fetch from "./fetch";

// Function to handle user registration
async function registerUser(name, email, password, confirmPassword) {
    if (!name) {
        throw new Error('Name is required');
    }
    if (!email) {
        throw new Error('Email is required');
    }
    if (!password) {
        throw new Error('Password is required');
    }
    if (!confirmPassword) {
        throw new Error('Confirm password is required');
    }
    return Fetch('/register', 'POST', { name, email, password, confirmPassword });
}

// Function to handle user sign-in
async function signInUser(email, password) {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    return Fetch('/signin', 'POST', { email, password });
}

// Function to handle password reset
async function forgotPassword(email) {
    const endpoint = '/api/forgot-password'; // Replace with your actual endpoint
    return Fetch(endpoint, 'POST', { email });
}

// Export the functions for use in other parts of the application
export { registerUser, signInUser, forgotPassword };
