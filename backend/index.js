const express = require("express")
const cors = require("cors")
const dbConnection = require("./config")
var bodyParser = require('body-parser');



var app = express(express.json);


app.use(cors());
app.use(bodyParser.json());

app.post('/', (request, response) => {
    const sqlQuery = 'INSERT INTO User (UID, Password) VALUES (?, ?);';
    const values = [request.body.UID, request.body.Password];
    dbConnection.query(sqlQuery, values, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Failed: Record was not added." });
        }
        return response.status(200).json({ Success: "Successful: Record was added!." });
    });
});


app.put('/:user', (request, response) => {
    const user = request.params.user;
    const sqlQuery = `UPDATE user SET FName = ?, LName = ?,
    PaymentInfo = ? WHERE UID = ?;`;
    const values = [request.body.FName, request.body.LName, request.body.PaymentInfo, user ];
    console.log(sqlQuery); // for debugging purposes:
    dbConnection.query(sqlQuery, [...values, user], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Failed: Record was not added." });
        }
        return response.status(200).json({ Success: "Successful: Record was updated!." });
    });
});

app.listen(2000, () => {
    console.log("Express server is running and listening");
});


