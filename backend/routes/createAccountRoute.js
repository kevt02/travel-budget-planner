const dbConnection = require("../config.js");

const express = require("express");
const cors = require("cors");
const router = express.Router();
router.use (express.json());
router.use(cors());

/**
 * @swagger
 * /createaccount:
 *   post:
 *     summary: Create a new user account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               Success: "Successful: Record was added!."
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             example:
 *               Error: "Failed: Record was not added."
 */
router.post('/createaccount', (request, response) => {
    // console.log(request.body.email);
    const sqlQuery = 'INSERT INTO User (Email, Password) VALUES (?, ?);';
    const values = [request.body.Email, request.body.Password];
    dbConnection.query(sqlQuery, values, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Failed: Record was not added." });
        }
        return response.status(200).json({ Success: "Successful: Record was added!." });
    });
});

/**
 * @swagger
 * /createaccount/{user}:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FName:
 *                 type: string
 *               LName:
 *                 type: string
 *               PaymentInfo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               Success: "Successful: Record was updated!."
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             example:
 *               Error: "Failed: Record was not added."
 */

router.put('/createaccount/:user', (request, response) => {
    const user = request.params.user;
    const sqlQuery = `UPDATE User SET FName = ?, LName = ?,
    PaymentInfo = ? WHERE UID = ?;`;
    const values = [request.body.FName, request.body.LName, request.body.PaymentInfo, user];
    console.log(sqlQuery); // for debugging purposes:
    dbConnection.query(sqlQuery, [...values, user], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Failed: Record was not added." });
        }
        return response.status(200).json({ Success: "Successful: Record was updated!." });
    });
});

/**
 * @swagger
 * /email/{userEmail}:
 *   get:
 *     summary: Get user ID by email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userEmail
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - UID: 123
 *       400:
 *         description: Failed operation
 *         content:
 *           application/json:
 *             example:
 *               Error: "Error in the SQL statement. Please check."
 */
router.get('/email/:userEmail', (request, response) => {
    const userEmail = request.params.userEmail;
    const sqlQuery = "SELECT UID FROM User Where Email = '" + userEmail + "'";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('SQLQuery', sqlQuery); // send a custom header attribute
        return response.status(200).json(result);
    });
});

module.exports = router;