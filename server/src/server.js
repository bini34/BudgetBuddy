// src/server.js
const app = require('./app');
const connectDB = require('./config/database')
const dotenv = require('./config/index')

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});