const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const auth = require('../middlewares/auth');

// Create a new loan
router.post('/', auth, loanController.createLoan);

// Get all loans for a user
router.get('/user/:userId', auth, loanController.getLoans);

// Get loans by year for a user
router.get('/year/:userId/:year', auth, loanController.getLoansByYear);

// Get loans by month for a user
router.get('/month/:userId/:year/:month', auth, loanController.getLoansByMonth);

// Get a specific loan by ID
router.get('/:id', auth, loanController.getLoanById);

// Update a loan by ID
router.put('/:id', auth, loanController.updateLoan);

// Delete a loan by ID
router.delete('/:id', auth, loanController.deleteLoan);

// Get loan statistics for a user

module.exports = router;
