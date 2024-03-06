const dbConnection = require("../config.js");

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
};
