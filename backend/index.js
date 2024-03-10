const express = require("express")
const cors = require("cors")
const dbConnection = require("./config")
var bodyParser = require('body-parser');



var app = express(express.json);


app.use(cors());
app.use(bodyParser.json());

app.get('/', (request, response) => {
    const sqlQuery = "SELECT * FROM User;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('SQLQuery', sqlQuery); // send a custom header attribute
        return response.status(200).json(result);
    });
});

app.post('/createaccount', (request, response) => {
    const sqlQuery = 'INSERT INTO User (Email, Password) VALUES (?, ?);';
    const values = [request.body.Email, request.body.Password];
    dbConnection.query(sqlQuery, values, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Failed: Record was not added." });
        }
        return response.status(200).json({ Success: "Successful: Record was added!." });
    });
});


app.put('/createaccount/:user', (request, response) => {
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

app.get('/stays/:city', (request, response) => {
    const city = request.params.city;
    const sqlQuery = "SELECT PropertyID, Name, Address, Rating, Price, Image FROM Property WHERE UID IS NULL AND City = '" + city + "' GROUP BY PropertyID;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('SQLQuery', sqlQuery); // send a custom header attribute
        return response.status(200).json(result);
    });
});

app.put('/stays/:city', (request, response) => {
    const sqlQuery = "UPDATE Property AS t1 SET t1.UID = ? "
                    +"WHERE t1.PropertyID = ? AND t1.TicketID = ( SELECT MIN(t2.TicketID)"
                    +" FROM Property AS t2 WHERE t2.PropertyID = t1.PropertyID AND t2.UID IS NULL )";
    const values = [request.body.UID, request.body.PropID];
    console.log(sqlQuery); // for debugging purposes:
    dbConnection.query(sqlQuery, [...values], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Failed: Record was not added." });
        }
        return response.status(200).json({ Success: "Successful: Record was updated!." });
    });
});
app.put('/stays/:city/reset', (request, response) => {
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

app.get('/goal/:user', (request, response) => {
    const user = request.params.user;
    const sqlQuery = "SELECT * FROM User INNER Join Goals ON User.UID = Goals.UID WHERE User.UID = '" + user + "' ;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('SQLQuery', sqlQuery); // send a custom header attribute
        return response.status(200).json(result);
    });
});

app.listen(2000, () => {
    console.log("Express server is running and listening");
});


