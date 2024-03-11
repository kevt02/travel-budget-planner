const dbConnection = require("../config.js");

const express = require("express");
const cors = require("cors");
const router = express.Router();
router.use (express.json());
router.use(cors());

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