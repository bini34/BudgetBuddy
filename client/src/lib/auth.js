import Fetch from "./fetch";
// Function to handle user registration
 async function registerUser({ firstName, lastName, email, password }) {
    try {
        console.log("registerUser", firstName, lastName, email, password);
        const response = await Fetch('/auth/register', 'POST', {
                firstName,
                lastName,
                email,
                password
        });

        const data = await response;
        console.log("data", data);


        return data;
    } catch (error) {
        console.log("error", error);
    }
}

// Function to handle user sign-in
async function signInUser(email, password) {
    
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    try {
        console.log("signInUser", email, password);
        const response = await Fetch('/auth/login', 'POST', { email, password });
        return response;
    } catch (error) {
        console.log("error", error);
    }
}
async function getUser(){
    const savedUserData = localStorage.getItem('user');
    const user = savedUserData && savedUserData !== 'undefined' ? JSON.parse(savedUserData) : null;
        console.log("user from cookie", user)
        return user;
}
// Function to handle password reset
async function forgotPassword(email) {
    const endpoint = '/api/forgot-password'; // Replace with your actual endpoint
    return Fetch(endpoint, 'POST', { email });
}

// Export the functions for use in other parts of the application
export { registerUser, signInUser, forgotPassword, getUser };
