const dbConnection = require("../config.js");

const saveFlight = (req, res) => {
    const {
        userId,
        flightCode,
        departureAirport,
        departureAirportName,
        arrivalAirport,
        arrivalAirportName,
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime,
        price
       
    } = req.body;

    const query = `
        INSERT INTO TransportationTickets (
            UID, 
            FlightCode, 
            DepartureAirportCode, 
            DepartureAirportName, 
            ArrivalAirportCode, 
            ArrivalAirportName, 
            DepartureDate, 
            DepartureTime, 
            ArrivalDate, 
            ArrivalTime, 
            Price
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const queryParams = [
        userId,
        flightCode,
        departureAirport,
        departureAirportName,
        arrivalAirport,
        arrivalAirportName,
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime,
        price
    ];
   // console.log('Executing SQL query:', query); 
    //console.log('Query parameters:', queryParams); 

    dbConnection.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Error saving flight:', error);
            return res.status(500).send('Error saving flight information. Details: ' + error.message);
        }
        if (results.affectedRows > 0) {
            return res.status(200).send({ message: 'Flight saved successfully', flightId: results.insertId });
        } else {
            return res.status(500).send('No rows were affected, which means the flight was not saved.');
        }
    });
};


const getFlightsByUserId = (req, res) => {
    const id = req.params.userId;

    const sqlQuery = 'SELECT * FROM TransportationTickets WHERE UID = ?';

 
    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.error('Error fetching flight data:', error);
            return res.status(500).json({ error: 'Error fetching flight information. Please try again later.' });
        }

        if (results.length > 0) {
            return res.status(200).json(results);
        } else {
            return res.status(404).json({ message: 'No flights found for this user.' });
        }
    });
};

module.exports = {
    saveFlight,
    getFlightsByUserId
};


