// ----------------------------------------------
// TCSS 460: Winter 2024
// Backend REST Service Module
// ----------------------------------------------
// Express is a Node.js web application framework
// that provides a wide range of APIs and methods
// Express API Reference:
// https://expressjs.com/en/resources/middleware/cors.html

// ----------------------------------------------
// retrieve necessary files (express and cors)
const express = require("express")
const cors = require("cors")
// retrieve the MySQL DB Configuration Module
const dbConnection = require("./config")
// use this library for parsing HTTP body requests
var bodyParser = require('body-parser');


// ----------------------------------------------
// (A)  Create an express application instance
//      and parses incoming requests with JSON
//      payloads
// ----------------------------------------------
var app = express(express.json);

// ----------------------------------------------
// (B)  Use the epxress cors middleware
//      Cross-origin resource sharing (CORS)
//      is a technique that restricts specified
//      resources within web page to be accessed
//      from other domains on which the origin
//      resource was initiated the HTTP request
//      Also use the bodyParser to parse in 
//      format the body of HTTP Requests
// ----------------------------------------------
app.use(cors());
app.use(bodyParser.json());

// ----------------------------------------------
// (1) Retrieve all records in population table
// root URI: http://localhost:port/
app.get('/', (request, response) => {
    const sqlQuery = "SELECT * FROM population;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('SQLQuery', sqlQuery); // send a custom header attribute
        return response.status(200).json(result);
    });
});

// ----------------------------------------------
// (2) Retrieve one record by city name
// city URI: http://localhost:port/city
app.get('/:city', (request, response) => {
    const city = request.params.city;
    const sqlQuery = "SELECT * FROM population WHERE CITY = '" + city + "';";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Error in the SQL statement. Please check." });
        }
        response.setHeader('CityName', city); // send a custom
        return response.status(200).json(result);
    });
});

// ----------------------------------------------
// (3) insert a new record by city name
// city URI: http://localhost:port/city
app.post('/:city', (request, response) => {
    const sqlQuery = 'INSERT INTO POPULATION VALUES (?);';
    const values = [request.body.city, request.body.population, request.body.populationRank,
    request.body.landArea, request.body.populationDensity, request.body.populationDensityRank];
    dbConnection.query(sqlQuery, [values], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Failed: Record was not added." });
        }
        return response.status(200).json({ Success: "Successful: Record was added!." });
    });
});

// ----------------------------------------------
// (4) update an existing record by city name
// city URI: http://localhost:port/city
app.put('/:city', (request, response) => {
    const city = request.params.city;
    const sqlQuery = `UPDATE POPULATION SET city = ?, population = ?,
    populationRank = ?, landArea = ?, populationDensity = ?, populationDensityRank = ?
    WHERE CITY = ? ;`;
    const values = [request.body.city, request.body.population, request.body.populationRank,
    request.body.landArea, request.body.populationDensity, request.body.populationDensityRank];
    console.log(sqlQuery); // for debugging purposes:
    dbConnection.query(sqlQuery, [...values, city], (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Failed: Record was not added." });
        }
        return response.status(200).json({ Success: "Successful: Record was updated!." });
    });
});

// ----------------------------------------------
// (5) Delete a record by city name
// city URI: http://localhost:port/city
app.delete('/:city', (request, response) => {
    const city = request.params.city;
    const sqlQuery = "DELETE FROM population WHERE CITY = ? ; ";
    dbConnection.query(sqlQuery, city, (err, result) => {
    if (err) {
    return response.status(400).json({ Error: "Failed: Record was not deleted" });
    }
    return response.status(200).json({ Success: "Succcessful: Record was deleted!" });
    });
    });

// ----------------------------------------------
// Ref: https://expressjs.com/en/4x/api.html#app
// (C)  Create a server such that it binds and
//      listens on a specified host and port.
//      We will use default host and port 3000.
app.listen(2000, () => {
    console.log("Express server is running and listening");
});


