const dbConnection = require("../config.js");

const express = require("express");
const cors = require("cors");
const router = express.Router();
router.use(express.json());
router.use(cors());

// get first and last name if logged in
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
  
  
  // get goal info for graph api
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