const authRepository = require('../repositories/authRepository');

class AuthService {
    constructor() {
        this.authRepository = new authRepository();
    }
    async register(userData) {

        
        const saltRounds = 10;
        userData.password = await bcrypt.hash(userData.password, saltRounds);
        // Business logic for registering a user
        return await authRepository.createUser(userData);
    }

    async login(credentials) {
        console.log(credentials);
        // Business logic for logging in a user
        return await authRepository.authenticateUser(credentials);
    }

    async logout(data) {
        // Business logic for logging out a user
        return await authRepository.logoutUser(data);
    }

    async refreshToken(data) {
        // Business logic for refreshing a token
        return await authRepository.refreshUserToken(data);
    }
}

module.exports = new AuthService();
