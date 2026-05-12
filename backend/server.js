require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
// cors lets frontend communicate with backend 
const cors = require('cors');
const path = require('path');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Read data from HTML forms
app.use(cors()); 

// Connect to database
connectDB();

// Import routes
const authRoutes = require('./routes/authRoutes');

// Use routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});