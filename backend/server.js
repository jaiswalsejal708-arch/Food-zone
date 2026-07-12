require('dotenv').config();
const express = require('express');
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Test database connection at startup
async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS connectionTest');
    console.log('Database connection successful! Test query result:', rows[0].connectionTest);
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
}
testConnection();

const cookieParser = require('cookie-parser');

// Middleware to parse incoming JSON payloads
app.use(express.json());
// Middleware to parse cookies from headers
app.use(cookieParser());

const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const simpleUserRoutes = require('./routes/simpleUserRoutes');

const errorHandler = require('./middleware/errorMiddleware');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/simple-users', simpleUserRoutes);

// Simple route to check if server is working
app.get('/', (req, res) => {
  res.send('Zomato/Swiggy Backend is Running!');
});

// Centralized error handler middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Nodemon trigger comment
