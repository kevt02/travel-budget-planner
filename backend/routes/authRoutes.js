// authRoutes.js or within an existing routes file
const express = require('express');
const router = express.Router();
const { login } = require('../controller/authController');

// Define the route for logging in
router.post('/login', login);  // Route for user login

module.exports = router;
