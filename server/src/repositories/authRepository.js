const User = require('../models/UserModel');

class AuthRepository {
    async createUser(userData) {
        try {
            const user = new User(userData);
            await user.save();
            return 'User created in database';
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async authenticateUser(credentials) {
        const user = await User.findOne({ email });
        if(!user){
          return res.json({message:'Incorrect email' }) 
        }
        const auth = await bcrypt.compare(password,user.password)

        if (!auth) {
          return res.json({message:'Incorrect password' }) 
        }
        // Logic to authenticate user against the database
        return user;
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

module.exports = AuthRepository;
