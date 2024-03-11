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

app.post('/createaccount', (request, response) => {
  const sqlQuery = 'INSERT INTO User (UID, Password) VALUES (?, ?);';
  const values = [request.body.UID, request.body.Password];
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
  const values = [request.body.FName, request.body.LName, request.body.PaymentInfo, user];
  console.log(sqlQuery); // for debugging purposes:
  dbConnection.query(sqlQuery, [...values, user], (err, result) => {
    if (err) {
      return response.status(400).json({ Error: "Failed: Record was not added." });
    }
    return response.status(200).json({ Success: "Successful: Record was updated!." });
  });
});

// logged into ':id' and get graph based off goals and preferences

// app.get('/:id/graph', (request, response) => {
//   const id = request.params.id;
//   const sqlQuery = `CALL GetUserTransportationData(${id})`;
//   dbConnection.query(sqlQuery, (err, result) => {
//     if (err) {
//       return response.status(400).json({ Error: "Failed: Transportation not found." });
//     }
//     return response.status(200).json(result);
//   })
// });



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

app.get('/:id/balance', (request, response) => {
  const id = request.params.id;
  const sqlQuery = `SELECT PaymentInfo, AccountBalance FROM User WHERE uid = ${id}`;
  dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
      return response.status(400).json({ Error: "Failed: User info not found." });
    }
    return response.status(200).json(result);
  })
});

app.get('/:id/totalprice', (request, response) => {
  const id = request.params.id;
  const sqlQuery = `SELECT Property.price AS 'HotelPrice' , TransportationTickets.price AS 'FlightPrice' FROM Property, TransportationTickets WHERE Property.UID = ${id};`;
  dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
      return response.status(400).json({ Error: "Failed: Price info not found." });
    }
    return response.status(200).json(result);
  })
});

app.put('/:id/updatepayment', (request, response) => {
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

app.listen(2000, () => {
  console.log("Express server is running and listening");
});
