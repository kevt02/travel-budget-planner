const dbConnection = require("../config.js");

const express = require("express");
const cors = require("cors");
const router = express.Router();
router.use(express.json());
router.use(cors());

/**
 * @swagger
 * paths:
 *   /{id}/name:
 *     get:
 *       summary: "Get user's first and last name"
 *       responses:
 *         '200':
 *           description: "An object containing the first and last name"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   fname:
 *                     type: string
 *                     example: "John"
 *                   lname:
 *                     type: string
 *                     example: "Doe"
 *         '400':
 *           description: "Error message"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Error:
 *                     type: string
 *                     example: "Failed: User info not found."
 */

router.get('/:id/name', (request, response) => {
    const id = request.params.id;
    const sqlQuery = `SELECT fname, lname FROM User WHERE uid = ${id};`;
    dbConnection.query(sqlQuery, (err, result) => {
      if (err) {
        return response.status(400).json({ Error: "Failed: User info not found." });
      }
      return response.status(200).json(result);
    })
  });
  
/**
* @swagger
* /{id}/goals:
*   get:
*     summary: Get goal information
*     description: Retrieve the goal information for a specific user by their ID.
*     tags:
*       - Goals
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: Unique identifier of the user
*     responses:
*       200:
*         description: An array of goals associated with the user ID.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   goal_id:
*                     type: integer
*                     description: Unique goal identifier
*                   uid:
*                     type: integer
*                     description: User ID associated with the goal
*                   title:
*                     type: string
*                     description: Title of the goal
*                   description:
*                     type: string
*                     description: Detailed description of the goal
*                   // Add all other goal fields here
*       400:
*         description: Error message if the goals could not be retrieved
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Error:
*                   type: string
*                   example: Failed: goal info not found.
*/

  router.get('/:id/goals', (request, response) => {
    const id = request.params.id;
    const sqlQuery = `SELECT * FROM Goals WHERE uid = ${id}`;
    dbConnection.query(sqlQuery, (err, result) => {
      if (err) {
        return response.status(400).json({ Error: "Failed: goal info not found." });
      }
      return response.status(200).json(result);
    })
  });

/**
* @swagger
* /{id}/goals:
*   put:
*     summary: Update a user's goal
*     description: Update goal details for a given user ID
*     tags:
*       - Goals
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: The user ID
*     requestBody:
*       description: Goal details that need to be updated
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               Budget:
*                 type: number
*               StartCity:
*                 type: string
*               EndCity:
*                 type: string
*               DepartDate:
*                 type: string
*                 format: date
*               MaxDuration:
*                 type: number
*     responses:
*       200:
*         description: Success message with updated record details
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Success:
*                   type: string
*                   example: Successful: Record was updated!.
*                 result:
*                   type: object
*                   properties: {} # Specify the properties of the updated goal here
*       400:
*         description: Error message
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Error:
*                   type: string
*                   example: Failed: Record was not updated.
*/
  router.put('/:id/goals', (request, response) => {
    const UID = request.params.id;
    const sqlQuery = `UPDATE Goals SET Budget = ?, StartCity = ?, EndCity = ?, DepartDate = ?, MaxDuration = ? WHERE UID = ?;`;
    const values = [request.body.Budget, request.body.StartCity, request.body.EndCity, request.body.DepartDate, request.body.MaxDuration];
    dbConnection.query(sqlQuery, [...values, UID], (err, result) => {
      if (err) {
        return response.status(400).json({ Error: "Failed: Record was not updated." });
      }
      return response.status(200).json({ Success: "Successful: Record was updated!.", result });
    });
  });


/**
* @swagger
* /{id}/balance:
*   get:
*     summary: Get user's balance
*     description: Retrieve the payment information and account balance for a specific user by their ID.
*     tags:
*       - User Balance
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: Unique identifier of the user
*     responses:
*       200:
*         description: An object containing the payment information and account balance
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 PaymentInfo:
*                   type: string
*                   description: Payment information
*                 AccountBalance:
*                   type: number
*                   format: float
*                   description: Current account balance
*       400:
*         description: Error message if the user's balance could not be retrieved
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Error:
*                   type: string
*                   example: Failed: User info not found.
*/

  router.get('/:id/balance', (request, response) => {
    const id = request.params.id;
    const sqlQuery = `SELECT PaymentInfo, AccountBalance FROM User WHERE uid = ${id}`;
    dbConnection.query(sqlQuery, (err, result) => {
      if (err) {
        return response.status(400).json({ Error: "Failed: User info not found." });
      }
      return response.status(200).json(result);
    })
  });
  
  router.get('/:id/totalprice', (request, response) => {
    const id = request.params.id;
    const sqlQuery = `SELECT Property.price AS 'HotelPrice', TransportationTickets.price AS 'FlightPrice'
    FROM Property
    LEFT JOIN TransportationTickets ON Property.UID = TransportationTickets.UID
    WHERE Property.UID = ${id};`;
    dbConnection.query(sqlQuery, (err, result) => {
      if (err) {
        return response.status(400).json({ Error: "Failed: Price info not found." });
      }
      return response.status(200).json(result);
    })
  });
  
  router.put('/:id/updatepayment', (request, response) => {
    const id = request.params.id;
    const sqlQuery = `UPDATE User SET PaymentInfo = ? WHERE UID = ${id};`;
    const values = [request.body.PaymentInfo, id];
    console.log(sqlQuery); // for debugging purposes:
    dbConnection.query(sqlQuery, [...values, id], (err, result) => {
      if (err) {
        return response.status(400).json({ Error: "Failed: Record was not updated." });
      }
      return response.status(200).json({ Success: "Successful: Record was updated!." });
    });
  })
  
  
  
  router.put('/:id/balance', (request, response) => {
    const UID = request.params.id;
    const sqlQuery = `UPDATE User SET AccountBalance = ? WHERE UID = ?;`;
    const values = [request.body.AccountBalance];
    dbConnection.query(sqlQuery, [...values, UID], (err, result) => {
      if (err) {
        return response.status(400).json({ Error: "Failed: Record was not updated." });
      }
      return response.status(200).json({ Success: "Successful: Record was updated!.", result });
    });
  });


router.get('/:startCity/:endCity/:travelType', (request, response) => {
  const startCity = request.params.startCity;
  const endCity = request.params.endCity;
  const travelType = request.params.travelType;
  const sqlQuery = `SELECT price, startdate FROM Transportation WHERE startcity LIKE '%${startCity}%' AND endcity LIKE '%${endCity}%';`;

  dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
      return response.status(400).json({ Error: "Failed: Transportation not found." });
    }
    return response.status(200).json(result);
  })
});

router.post('/:id/goals', (request, response) => {
  const UID = request.params.id;
  const sqlQuery = `INSERT Goals SET Budget = ?, StartCity = ?, EndCity = ?, DepartDate = ?, MaxDuration = ?, UID = ?;`;
  const values = [request.body.Budget, request.body.StartCity, request.body.EndCity, request.body.DepartDate, request.body.MaxDuration];
  dbConnection.query(sqlQuery, [...values, UID], (err, result) => {
    if (err) {
      return response.status(400).json({ Error: "Failed: Record was not updated." });
    }
    return response.status(200).json({ Success: "Successful: Record was updated!.", result });
  });
});

module.exports = router;