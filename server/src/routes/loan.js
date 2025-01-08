const express = require('express');
const router = express.Router();

// Controller functions (to be implemented)
const {createLoan,getLoans,getLoanById,updateLoan,deleteLoan} = require('../controllers/loanController');

// Create a new loan
router.post('/', createLoan);

// Get all loans
router.get('/', getLoans);

// Get a specific loan by ID
router.get('/:id', getLoanById);

// Update a loan by ID
router.put('/:id', updateLoan);

// Delete a loan by ID
router.delete('/:id', deleteLoan);

module.exports = router;
