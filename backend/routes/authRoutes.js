// authRoutes.js or within an existing routes file
const express = require('express');
const router = express.Router();
const { login } = require('../controller/authController');
const { saveFlight, getFlightsByUserId } = require('../controller/transController');

// Define the route for logging in
router.post('/login', login);  // Route for user login
//router.get('/travel', traveltype); // Route for travel
router.post('/saveFlight', saveFlight);

router.get('/:userId/flight', getFlightsByUserId);

module.exports = router;
