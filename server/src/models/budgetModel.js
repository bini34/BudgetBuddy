const mongoose = require('mongoose');

const expensePlanCategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Category name, e.g., "Rent", "Electricity"
  amount: { type: Number, default: 0 },  // Amount allocated or spent
});

const incomeSourceSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Income source name, e.g., "Salary"
  amount: { type: Number, required: true }, // Income amount
});

const savingsPlanSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Savings plan name, e.g., "Emergency Fund"
  percentage: { type: Number, default: 0 }, // Percentage allocated, e.g., 50%
  amount: { type: Number, default: 0 }, // Calculated savings amount
});

const budgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User reference
  incomeSources: [incomeSourceSchema], // List of income sources
  expensePlanCategories: {
    needs: [expensePlanCategorySchema], // List of "Needs" categories
    wants: [expensePlanCategorySchema], // List of "Wants" categories
    others: [expensePlanCategorySchema], // List of "Others" categories
  },
  savingsPlan: [savingsPlanSchema], // List of savings plans
  month: {
    year: { type: Number, required: true },
    month: { type: Number, required: true, min: 1, max: 12 }
  },
}, { timestamps: { createdAt: true, updatedAt: true } });

module.exports = mongoose.model('Budget', budgetSchema);
