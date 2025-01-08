const authService = require('../services/authServices');
const { validationResult } = require('express-validator');
const apiResponse = require('../utils/apiResponse');
const jwt = require('jsonwebtoken');

class AuthController {
    async register(req, res) {

        console.log(req.body);  
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return apiResponse.badRequest(res, 'Validation errors', 400);
        }

        try {
            const { name, email, password } = req.body;
            
            const user = await authService.register({ name, email, password });
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            apiResponse.created(res, { user, token }, 'User registered successfully');
        } catch (err) {
            apiResponse.error(res, err.message);
        }
    }

    async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return apiResponse.badRequest(res, 'Validation errors', 400);
        }

        try {
            const { email, password } = req.body;
            const user = await authService.login({ email, password });
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            apiResponse.success(res, { user, token }, 'Login successful');
        } catch (err) {
            apiResponse.unauthorized(res, err.message);
        }
    }

    async logout(req, res) {
        try {
            // Invalidate the token logic here (if applicable)
            // For example, you might add the token to a blacklist

            apiResponse.success(res, null, 'User logged out');
        } catch (err) {
            apiResponse.error(res, err.message);
        }
    }

    async refreshToken(req, res) {
        try {
            // Logic to refresh token
            
            apiResponse.success(res, null, 'Token refreshed');
        } catch (err) {
            apiResponse.error(res, err.message);
        }
    }
}

module.exports = new AuthController();
