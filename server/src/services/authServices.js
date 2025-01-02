const authRepository = require('../repositories/authRepository');

exports.register = async (userData) => {
    // Business logic for registering a user
    return await authRepository.createUser(userData);
};

exports.login = async (credentials) => {
    // Business logic for logging in a user
    return await authRepository.authenticateUser(credentials);
};

exports.logout = async (data) => {
    // Business logic for logging out a user
    return await authRepository.logoutUser(data);
};

exports.refreshToken = async (data) => {
    // Business logic for refreshing a token
    return await authRepository.refreshUserToken(data);
};
