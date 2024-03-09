const dbConnection = require("../config.js");

const saveFlight = (req, res) => {
    const {
        flightCode,
        departureAirport,
        arrivalAirport,
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime,
        price
    } = req.body;

    const query = `
        INSERT INTO Flights (
            FlightCode, 
            DepartureAirportCode, 
            ArrivalAirportCode, 
            DepartureDate, 
            DepartureTime, 
            ArrivalDate, 
            ArrivalTime, 
            Price
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const queryParams = [
        flightCode,
        departureAirport.code,
        arrivalAirport.code,
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime,
        parseFloat(price).toFixed(2) 
    ];

    dbConnection.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Error saving flight:', error);
            return res.status(500).send('Error saving flight information. Details: ' + error.message);
        }
        if (results.affectedRows && results.affectedRows > 0) {
            return res.status(200).send({ message: 'Flight saved successfully', flightId: results.insertId });
        } else {
            return res.status(500).send('No rows were affected, which means the flight was not saved.');
        }
    });
};

const getFlightByCode = (req, res) => {
    const { flightCode } = req.params;

    const query = 'SELECT * FROM Flights WHERE FlightCode = ?';
    const queryParams = [flightCode];

    dbConnection.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Error fetching flight data:', error);
            return res.status(500).send('Error fetching flight information. Details: ' + error.message);
        }

        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('Flight not found.');
        }
    });
};

module.exports = {
    saveFlight,
    getFlightByCode
};







/*const dbConnection = require("../config.js");

const traveltype = (req, res) => {
    const { type, startDate, endDate, startCity, endCity } = req.query;

    if (!type || (type !== 'Train' && type !== 'Plane')) {
        return res.status(400).send('Invalid travel type specified.');
    }

    let query = 'SELECT * FROM Transportation WHERE TravelType = ?';
    let queryParams = [type];

    if (startCity && endCity) {
        query += ' AND StartCity = ? AND EndCity = ?';
        queryParams.push(startCity, endCity);
    } else if (startCity || endCity) {
        return res.status(400).send('Both start city and end city must be specified.');
    }

    if (startDate) {
        query += ' AND StartDate >= ?';
        queryParams.push(startDate);
    }

    if (endDate) {
        query += ' AND EndDate <= ?';
        queryParams.push(endDate);
    }
    

    // Executing the query
    dbConnection.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).send('Error fetching travel information. Details: ' + error.message);
        }

        res.json(results);
    });
};

module.exports = {
    traveltype
};*/
