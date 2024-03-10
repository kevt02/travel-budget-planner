const express = require("express")
const cors = require("cors")
const dbConnection = require("./config")
var bodyParser = require('body-parser');



var app = express(express.json);

app.use(cors());
app.use(bodyParser.json());

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
  const values = [request.body.FName, request.body.LName, request.body.PaymentInfo, user ];
  console.log(sqlQuery); // for debugging purposes:
  dbConnection.query(sqlQuery, [...values, user], (err, result) => {
      if (err) {
          return response.status(400).json({ Error: "Failed: Record was not added." });
      }
      return response.status(200).json({ Success: "Successful: Record was updated!." });
  });
});

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
      return response.status(400).json({ err: "Could not retrieve Travel Preferences"});
    }
    return response.status(200).json(result);
  })
})

app.post('/skyscanner',async (request, response) => {
  console.log(request.body)
  const url = "https://partners.api.skyscanner.net/apiservices/v3/autosuggest/flights"
  const options = {
    method: 'POST',
    headers: {
      'Accept':'application/json, text/plain, *.*',
      'Content-Type':"text/json",
        'x-api-key': 'sh428739766321522266746152871799',
        "Access-Control-Allow-Origin":"*"

    },
    body:JSON.stringify(request.body)}
  
  try {
    const r = await fetch(url, options);
    const data = await r.json();
    console.log(data);
    response.json(data)
} catch (error) {
    console.error('Error:', error);
    response.status(400).json({error:error.toString()})
}
})
app.listen(2000, () => {
  console.log("Express server is running and listening");
});