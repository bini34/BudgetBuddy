const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
})

module.exports = app;
