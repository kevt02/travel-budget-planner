const express = require("express");
const cors = require("cors");



const router = express.Router();
router.use(express.json());
router.use(cors());
const { login } = require('./loginRoute');
const { saveFlight, getFlightsByUserId } = require('./flightsRoute');


// Define the route for logging in
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user by credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Authentication failed.
 */
router.post('/login', login);  // Route for user login



/**
 * @swagger
 * /saveFlight:
 *   post:
 *     summary: Save flight information
 *     description: Saves a user's flight information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flight'
 *     responses:
 *       200:
 *         description: Flight information saved successfully.
 *       400:
 *         description: Bad request.
 */
router.post('/saveFlight', saveFlight);


/**
 * @swagger
 * /{userId}/flight:
 *   get:
 *     summary: Get flights by User ID
 *     description: Retrieve a list of flights for a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: List of flights retrieved successfully.
 *       404:
 *         description: User not found.
 */

router.get('/:userId/flight', getFlightsByUserId);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root Endpoint
 *     description: Returns the default API welcome message.
 *     responses:
 *       200:
 *         description: Welcome to the API.
 */

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

module.exports = router;
