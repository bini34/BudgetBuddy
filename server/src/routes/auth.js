const express = require('express');
const authController = require('../controllers/authController');
const { registerValidation, loginValidation, validate } = require('../validation/authValidation');

// Register a new user with validation
router.post('/auth/register', registerValidation, validate, authController.register);

// Login a user with validation
router.post('/auth/login', loginValidation, validate, authController.login);

// Logout a user
router.post('/auth/logout', authController.logout);

// Refresh authentication token
router.post('/auth/refresh-token', authController.refreshToken);

module.exports = router;