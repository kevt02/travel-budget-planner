const dbConnection = require("../config.js");

const traveltype = (req, res) => {
    const { type, startDate, endDate, startCity, endCity } = req.query; 

    if (!type || (type !== 'Train' && type !== 'Plane')) {
        return res.status(400).send('Invalid travel type specified.');
    }

    // Starting the query with the travel type condition
    let query = 'SELECT * FROM Transportation WHERE TravelType = ?';
    let queryParams = [type];

   
    if (startCity && endCity) { //check condition and see ther has a start and end city or not
        query += ' AND StartCity = ? AND EndCity = ?';
        queryParams.push(startCity, endCity);
    } else if (startCity || endCity) { // Error if only one is provided
        return res.status(400).send('Both start city and end city must be specified.');
    }

    // for start and end dates
    if (startDate) {
        query += ' AND Date >= ?';
        queryParams.push(startDate);
    }

    if (endDate) {
        query += ' AND Date <= ?';
        queryParams.push(endDate);
    }

    // Executing the query
    dbConnection.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).send('Error fetching travel information.');
        }

        res.json(results);
    });
};

module.exports = {
    traveltype
};
