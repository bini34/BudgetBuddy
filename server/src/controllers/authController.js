const authService = require('../services/authServices');
const apiResponse = require('../utils/apiResponse');
class AuthController {
    async register(req, res) {
        try {
            const result = await authService.register(req.body);
            return apiResponse.created(res, result, 'User registered successfully');
        } catch (error) {
            if (error.code === 11000) { // MongoDB duplicate key error
                return apiResponse.badRequest(res, 'Email already exists');
            }
            if (error.name === 'ValidationError') {
                return apiResponse.badRequest(res, error.message);
            }
            return apiResponse.error(res, error.message);
        }
    }

    async login(req, res) {
        try {
            const result = await authService.login(req.body);
            return apiResponse.success(res, result, 'Login successful');
        } catch (error) {
            if (error.message === 'Incorrect email' || error.message === 'Incorrect password') {
                return apiResponse.unauthorized(res, error.message);
            }
            return apiResponse.error(res, error.message);
        }
    }

    async logout(req, res) {
        try {
            const result = await authService.logout(req.body);
            return apiResponse.success(res, result, 'Logout successful');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    }

    async refreshToken(req, res) {
        try {
            const result = await authService.refreshToken(req.body);
            return apiResponse.success(res, result, 'Token refreshed successfully');
        } catch (error) {
            return apiResponse.unauthorized(res, error.message);
        }
    }
}

module.exports = new AuthController();
