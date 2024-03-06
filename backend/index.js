// ----------------------------------------------
// TCSS 460: Winter 2024
// Backend REST Service Module for Assignment Planner
// ----------------------------------------------
require('dotenv').config(); 
const express = require("express");
const morgan = require("morgan"); 
const bodyParser = require("body-parser"); 
const cors = require('cors'); 

// ----------------------------------------------
// Import route for authentication
// ----------------------------------------------
const authRoutes = require('./routes/authRoutes');

// ----------------------------------------------
// Middleware for logging, parsing body, and handling CORS
// ----------------------------------------------
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json()); // Parses incoming request bodies in JSON format.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ----------------------------------------------
// Route middleware for authentication
// ----------------------------------------------

app.use('/auth', authRoutes);


// ----------------------------------------------
// Error handling middleware to catch and respond to errors throughout the application
// ----------------------------------------------
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).send({
        error: true,
        message: message
    });
});

// ----------------------------------------------
// Start the server on the configured port
// ----------------------------------------------
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
