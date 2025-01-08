const bcrypt = require('bcrypt');
const authRepository = require('../repositories/authRepository');
const jwt = require('../utils/jwt');
class AuthService {
    async register(userData) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
            
            // Create a new object with the correct field names
            const userToCreate = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: hashedPassword
            };           
            console.log("userData in service", userToCreate);
            const user = await authRepository.createUser(userToCreate);
            const token = jwt.generateToken(user);
            return { user, token };
        } catch (error) {
            throw error;
        }
    }

    async login(credentials) {
        console.log("credentials in service", credentials);
        const user = await authRepository.authenticateUser(credentials);
        const token = jwt.generateToken(user);
        return { user, token };
    }

    async logout(data) {
        return await authRepository.logoutUser(data);
    }

    async refreshToken(data) {
        return await authRepository.refreshUserToken(data);
    }
}

module.exports = new AuthService();
