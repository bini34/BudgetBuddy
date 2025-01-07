const express = require('express');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/user');
const incomeRoutes = require('./routes/income');
const loanRoutes = require('./routes/loan');
const app = express();

// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/user', userRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/loan', loanRoutes);

// Simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
})

module.exports = app;
