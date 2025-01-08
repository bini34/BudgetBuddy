import Fetch from "./fetch";

// Function to handle user registration
export async function registerUser({ firstName, lastName, email, password }) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data;
    } catch (error) {
        throw error;
    }
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
