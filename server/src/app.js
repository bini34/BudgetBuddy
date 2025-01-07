const express = require('express');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/user');
const incomeRoutes = require('./routes/income');
const loanRoutes = require('./routes/loan');
const app = express();

// Middleware
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', expenseRoutes);
app.use('/api', userRoutes);
app.use('/api', incomeRoutes);
app.use('/api', loanRoutes);

// Simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
})

module.exports = app;
