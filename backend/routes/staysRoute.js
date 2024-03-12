const dbConnection = require("../config.js");

const express = require("express");
const cors = require("cors");
const router = express.Router();
router.use(express.json());
router.use(cors());

/**
 * @swagger
 * /properties/{city}:
 *   get:
 *     summary: Get available properties by city
 *     tags: 
 *       - Properties
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: UID
 *         description: User ID for filtering properties
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Property'
 *      400:
 *         description: Failed: Error in the SQL statement. Please check.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Error:
 *                   type: string
 */

router.get('/:city', (request, response) => {
    const city = request.params.city;
    const UID = request.query.UID; // Retrieve UID from query parameter
    const sqlQuery = "SELECT PropertyID, Name, Address, Rating, Price, Image FROM Property WHERE UID IS NULL AND City = ? AND NOT EXISTS (SELECT 1 FROM Property AS p2 WHERE p2.PropertyID = Property.PropertyID AND p2.UID = ?) GROUP BY PropertyID;";
    const values = [city, UID];
    dbConnection.query(sqlQuery, values, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('SQLQuery', sqlQuery); // send a custom header attribute
        return response.status(200).json(result);
    });
});


/**
 * @swagger
 * /properties/{city}:
 *   get:
 *     summary: Get available properties by city
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: UID
 *         description: User ID for filtering properties
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Property'
 *       400:
 *         description: Failed: Error in the SQL statement. Please check.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Error:
 *                   type: string
 */

router.put('/:city', (request, response) => {
    const sqlQuery = "UPDATE Property AS t1 SET t1.UID = ? "
        + "WHERE t1.PropertyID = ? AND t1.TicketID = ( SELECT MIN(t2.TicketID)"
        + " FROM Property AS t2 WHERE t2.PropertyID = t1.PropertyID AND t2.UID IS NULL )";
    const values = [request.body.UID, request.body.PropID];
    console.log(sqlQuery); // for debugging purposes:
    dbConnection.query(sqlQuery, [...values], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Failed: Record was not added." });
        }
        return response.status(200).json({ Success: "Successful: Record was updated!." });
    });
});
router.get('/:city/current', (request, response) => {
    const city = request.params.city;
    const UID = request.query.UID;
    const sqlQuery = "SELECT * FROM Property WHERE City = ? AND UID = ?";
    const values = [city, UID];
    dbConnection.query(sqlQuery, values, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('SQLQuery', sqlQuery); // send a custom header attribute
        return response.status(200).json(result);
    });
});

router.put('/:city/reset', (request, response) => {
    const sqlQuery = "UPDATE Property SET UID = NULL WHERE UID = ?";
    const values = [request.body.UID];
    console.log(sqlQuery); // for debugging purposes:
    dbConnection.query(sqlQuery, [...values], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Failed: Record was not added." });
        }
        return response.status(200).json({ Success: "Successful: Record was updated!." });
    });
});


module.exports = router;