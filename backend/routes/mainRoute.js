const express = require("express");
const cors = require("cors");



const router = express.Router();
router.use(express.json());
router.use(cors());
const { login } = require('./loginRoute');
const { saveFlight, getFlightsByUserId } = require('./flightsRoute');


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
 *               - email
 *               - password
 *             properties:
 *               email:
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
 *             type: object
 *             properties:
 *               UID:
 *                 type: string
 *                 description: The user's unique identifier
 *               FlightCode:
 *                 type: string
 *                 description: The flight's code
 *               DepartureAirportCode:
 *                 type: string
 *                 description: The airport code for the departure location
 *               DepartureAirportName:
 *                 type: string
 *                 description: The name of the departure airport
 *               ArrivalAirportCode:
 *                 type: string
 *                 description: The airport code for the arrival location
 *               ArrivalAirportName:
 *                 type: string
 *                 description: The name of the arrival airport
 *               DepartureDate:
 *                 type: string
 *                 format: date
 *                 description: The date of departure
 *               DepartureTime:
 *                 type: string
 *                 description: The time of departure
 *               ArrivalDate:
 *                 type: string
 *                 format: date
 *                 description: The date of arrival
 *               ArrivalTime:
 *                 type: string
 *                 description: The time of arrival
 *               Price:
 *                 type: number
 *                 format: float
 *                 description: The price of the flight ticket
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
 *           type: int
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
 *  /:
 * get:
 *    summary: Retrieve default (root) API response message
 * 
 */
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

module.exports = router;
