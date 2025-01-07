const express = require('express');
const authController = require('../controllers/authController');
const { registerValidation, loginValidation, validate } = require('../validation/authValidation');

const router = express.Router();

// Register a new user with validation
router.post('/register', registerValidation, validate, authController.register);

// Login a user with validation
router.post('/login', loginValidation, validate, authController.login);

// Logout a user
router.post('/logout', authController.logout);

// Refresh authentication token
router.post('/refresh-token', authController.refreshToken);

module.exports = router;