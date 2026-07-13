require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from the frontend (Vite dev server or Vercel production URL)
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || /https:\/\/.*\.vercel\.app$/i.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

const { createUserTable } = require('./models/User');
const { createRestaurantTable } = require('./models/Restaurant');
const { initTable: initSimpleUserTable } = require('./models/SimpleUser');

// Initialize DB: create tables in the correct dependency order
async function initDB() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS connectionTest');
    console.log('✅ Database connection successful! Test result:', rows[0].connectionTest);

    // 1. users table first (no dependencies)
    await createUserTable();
    console.log('✅ users table ready');

    // 2. tables that depend on users
    await createRestaurantTable();
    console.log('✅ restaurants table ready');

    await initSimpleUserTable();
    console.log('✅ simple_users table ready');

  } catch (error) {
    console.error("❌ DB initialization failed:");
    console.error(error.stack);
  }
}
initDB();

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
