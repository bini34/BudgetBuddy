const express = require('express');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/users');
const incomeRoutes = require('./routes/income');
const loanRoutes = require('./routes/loan');
const walletRoutes = require('./routes/wallet');
const budgetRoutes = require('./routes/budget');
const savingRoutes = require('./routes/saving');
const reportRoutes = require('./routes/report');
const cors = require('./middlewares/cors');
const apiResponse = require('./utils/apiResponse');

const app = express();
// Middleware
app.use(express.json());
app.use(cors);
app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/expense', expenseRoutes);
app.use('/api/v1/budget', budgetRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/income', incomeRoutes);
app.use('/api/v1/loan', loanRoutes);
app.use('/api/v1/wallet', walletRoutes);
app.use('/api/v1/saving', savingRoutes);
app.use('/api/v1/report', reportRoutes);
// Simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
})

// Example error handler middleware
// const errorHandler = (err, req, res, next) => {
//   // Handle server errors (500)
//   if (err instanceof Error) {
//     console.log(err);
//     return apiResponse.error(res, err.message);
//   }
//   next();
// };

// // Example 404 middleware for incorrect routes
// const notFoundHandler = (req, res) => {
//   return apiResponse.notFound(res, `Route ${req.originalUrl} not found`);
// };

// Example bad request validation middleware

// Usage in your Express app:
// app.use('*', notFoundHandler);  // For handling incorrect routes - put this after all valid routes
// app.use(errorHandler);  // Error handling middleware - put this last

module.exports = app;
