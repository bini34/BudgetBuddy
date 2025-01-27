const express = require('express');
const router = express.Router();
const savingController = require('../controllers/savingController');
const auth = require('../middlewares/auth');

// Create a new saving goal
router.post('/', auth, savingController.createSaving);

// Get all savings for a user
router.get('/', auth, savingController.getAllSavings);

// Get a single saving by ID
router.get('/:id', auth, savingController.getSavingById);

// Update a saving
router.put('/:id', auth, savingController.updateSaving);

// Delete a saving
router.delete('/:id', auth, savingController.deleteSaving);

// Get savings progress
router.get('/progress/:userId', auth, savingController.getSavingsProgress);

module.exports = router;
