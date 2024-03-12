const dbConnection = require("../config.js");

const express = require("express");
const cors = require("cors");
const router = express.Router();
router.use(express.json());
router.use(cors());

/**
 * @swagger
 * /stays/{city}:
 *   get:
 *     summary: Get properties in a city
 *     parameters:
 *       - name: city
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: City name*
 *       - name: UID
 *         in: query
 *         schema:
 *           type: string
 *           description: User ID for filtering properties*
 *     responses:
 *       '200':
 *         description: Successful response
 *       '400':
 *         description: Error in the SQL statement
 *         content: {}
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
 * /stays/{city}:
 *   put:
 *     summary: Update property UID in a city
 *     parameters:
 *       - name: city
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: City name*
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             UID:
 *               type: string
 *               description: User ID for the update*
 *             PropID:
 *               type: integer
 *               description: Property ID for the update*
 *     responses:
 *       '200':
 *         description: Successful update
 *       '400':
 *         description: Failed to update record
 *        
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

/**
 * @swagger
 * /{city}/current:
 *   get:
 *     summary: Get current properties in a city for a specific UID
 *     parameters:
 *       - name: city
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: City name*
 *       - name: UID
 *         in: query
 *         schema:
 *           type: string
 *           description: User ID for filtering current properties*
 *     responses:
 *       '200':
 *         description: Successful response
 *       '400':
 *         description: Error in the SQL statement
 *         
 */
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


/**
 * @swagger
 * /stays/{city}/reset:
 *   put:
 *     summary: Reset UID for all properties in a city
 *     parameters:
 *       - name: city
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: City name*
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             UID:
 *               type: string
 *               description: User ID for the reset*
 *     responses:
 *       '200':
 *         description: Successful reset
 *       '400':
 *         description: Failed to reset records
 *         
 */
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