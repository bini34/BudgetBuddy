const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

class AuthRepository {
    async createUser(userData) {
        console.log("userData in repository", userData);
        try {
            const user = new User(userData);
            const savedUser = await user.save();
            
            // Generate token
            
            return {
                user: {
                    id: savedUser._id,
                    firstName: savedUser.firstName,
                    lastName: savedUser.lastName,
                    email: savedUser.email
                }
            };
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async authenticateUser(credentials) {
        try {
            const { email, password } = credentials;
            const user = await User.findOne({ email });
            
            if (!user) {
                throw new Error('Incorrect email');
            }
            
            const auth = await bcrypt.compare(password, user.password);
            
            if (!auth) {
                throw new Error('Incorrect password');
            }
            
            return {user:{
                id:user._id,
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email
            }};
        } catch (error) {
            throw error;
        }
    }

    async logoutUser(data) {
        // Logic to handle user logout
        return 'User logged out from database';
    }

    async refreshUserToken(data) {
        // Logic to refresh user token
        return 'User token refreshed';
    }
}

module.exports = new AuthRepository();
