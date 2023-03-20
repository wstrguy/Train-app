require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./database/db');

// Connect to database
connectDB();

// middleware
app.use(express.json());

// Routes
const userRoutes = require('./routes/user.routes');

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.use('/api/users', userRoutes);

module.exports = app;