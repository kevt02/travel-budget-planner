const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// CRUD operations for Assignments
router.post('/login', authController.login);  // Create a new assignment


module.exports = router;
