const express = require("express")
const cors = require("cors")
const dbConnection = require("./config")
var bodyParser = require('body-parser');



var app = express(express.json);


app.use(cors());
app.use(bodyParser.json());


// ----------------------------------------------
// Import route for authentication
// ----------------------------------------------
const authRoutes = require('./routes/authRoutes');

// ----------------------------------------------
// Route middleware for authentication
// ----------------------------------------------

app.use('/auth', authRoutes);

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



app.put('/createaccount/:user', (request, response) => {
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

app.get('/email/:userEmail', (request, response) => {
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

app.get('/stays/:city/', (request, response) => {
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



app.put('/stays/:city', (request, response) => {
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
app.get('/stays/:city/current', (request, response) => {
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



// get first and last name if logged in
app.get('/:id/name', (request, response) => {
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
app.get('/:id/goals', (request, response) => {
    const id = request.params.id;
    const sqlQuery = `SELECT * FROM Goals WHERE uid = ${id}`;
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Failed: goal info not found." });
        }
        return response.status(200).json(result);
    })
});

app.put('/:id/goals', (request, response) => {
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

app.post('/:id/goals', (request, response) => {
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

app.get('/:id/balance', (request, response) => {
    const id = request.params.id;
    const sqlQuery = `SELECT AccountBalance FROM User WHERE uid = ${id}`;
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Failed: User info not found." });
        }
        return response.status(200).json(result);
    })
});

app.put('/:id/balance', (request, response) => {
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



app.get('/:id/preferences', (request, response) => {
    const id = request.params.id;
    const sqlQuery = `SELECT * FROM TravelPreference WHERE UID = ${id};`;
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ err: "Could not retrieve Travel Preferences" });
        }
        return response.status(200).json(result);
    })
})







app.get('/savings/:startCity/:endCity/:travelType', (request, response) => {
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

app.get('/preferences/:id', (request, response) => {
    const id = request.params.id;
    const sqlQuery = `SELECT * FROM TravelPreference WHERE UID = ${id};`;
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ err: "Could not retrieve Travel Preferences" });
        }
        return response.status(200).json(result);
    })
})

app.post('/skyscanner', async (request, response) => {
    console.log(request.body)
    const url = "https://partners.api.skyscanner.net/apiservices/v3/autosuggest/flights"
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, *.*',
            'Content-Type': "text/json",
            'x-api-key': 'sh428739766321522266746152871799',
            "Access-Control-Allow-Origin": "*"

        },
        body: JSON.stringify(request.body)
    }

    try {
        const r = await fetch(url, options);
        const data = await r.json();
        console.log(data);
        response.json(data)
    } catch (error) {
        console.error('Error:', error);
        response.status(400).json({ error: error.toString() })
    }
})

app.listen(2000, () => {
    console.log("Express server is running and listening");
});