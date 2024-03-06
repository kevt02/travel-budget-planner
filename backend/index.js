const express = require("express")
const cors = require("cors")
const dbConnection = require("./config")
var bodyParser = require('body-parser');



var app = express(express.json);

app.use(cors());
app.use(bodyParser.json());

// ----------------------------------------------
// (3) insert a new record by city name
// city URI: http://localhost:port/city
app.post('/', async (req, res) => {
  try {
    const users = new Population.User(req.body);
    await users.save();
    res.status(201).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ----------------------------------------------
// (4) update an existing record by city name
// city URI: http://localhost:port/city
app.put('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const updatedData = req.body;
    console.log(req.body); // Log request body
    console.log(req.params)

    // Validate if the city name and updated data are provided
    if (!email || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: 'City name and updated data are required' });
    }
    // Debugging output to log incoming request data
    console.log('Incoming PUT request data:');
    console.log('User:', email);
    console.log('Updated Data:', updatedData);
    
    // Find the population document by city name and update all schema elements
    const updatedPopulation = await Population.User.findOneAndUpdate(
      { email: email }, // Find document by city name
      updatedData, // Updated data object
      { new: true } // Return the updated document
    );

    // Check if the population document is found and updated successfully
    if (!updatedPopulation) {
      return res.status(404).json({ error: 'Population records not found for the specified city' });
    }

    // Respond with the updated population document
    res.json(updatedPopulation);
  } catch (error) {
    // Handle errors that occur during the update operation
    console.error('Error:', error);
    // Respond with a 500 Internal Server Error status and an error message
    res.status(500).json({ error: 'Error updating population records' });
  }
});


// ----------------------------------------------
// (1) Retrieve all records in population table
// root URI: http://localhost:port/
app.get('/', async (req, res) => {
  try {
    const populations = await Population.find();
    res.json(populations);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error retrieving population records' });
  }
});

// ----------------------------------------------
// (2) Retrieve one record by city name
// city URI: http://localhost:port/city
app.get('/:city', async (req, res) => {
  try {
    // Extract the city name from the URL parameter
    const city = req.params.city;

    // Validate if the city name is provided
    if (!city) {
      // If the city name is missing, respond with a 400 Bad Request status and an error message
      return res.status(400).json({ error: 'City name is required' });
    }

    // Perform a case-insensitive search for the city name in the population documents
    // Create a regular expression with the city name and 'i' flag for case insensitivity
    const regex = new RegExp(city, 'i');
    // Use the regular expression to search for population documents with matching city names
    const populations = await Population.find({ city: regex });

    // Check if population records are found for the specified city
    if (populations.length === 0) {
      // If no population records are found, respond with a 404 Not Found status and an error message
      return res.status(404).json({ error: 'Population records not found for the specified city' });
    }

    // Respond with the population records for the specified city as JSON
    res.json(populations);
  } catch (error) {
    // Handle errors that occur during the search operation
    console.error('Error:', error);
    // Respond with a 500 Internal Server Error status and an error message
    res.status(500).json({ error: 'Error searching population records' });
  }
});

// ----------------------------------------------
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).send({
        error: true,
        message: message
    });
});


// ----------------------------------------------
// (1) Retrieve all records in population table
// root URI: http://localhost:port/
app.get('/', async (req, res) => {
  try {
    const populations = await Population.find();
    res.json(populations);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error retrieving population records' });
  }
});

// ----------------------------------------------
// (2) Retrieve one record by city name
// city URI: http://localhost:port/city
app.get('/:city', async (req, res) => {
  try {
    // Extract the city name from the URL parameter
    const city = req.params.city;

    // Validate if the city name is provided
    if (!city) {
      // If the city name is missing, respond with a 400 Bad Request status and an error message
      return res.status(400).json({ error: 'City name is required' });
    }

    // Perform a case-insensitive search for the city name in the population documents
    // Create a regular expression with the city name and 'i' flag for case insensitivity
    const regex = new RegExp(city, 'i');
    // Use the regular expression to search for population documents with matching city names
    const populations = await Population.find({ city: regex });

    // Check if population records are found for the specified city
    if (populations.length === 0) {
      // If no population records are found, respond with a 404 Not Found status and an error message
      return res.status(404).json({ error: 'Population records not found for the specified city' });
    }

    // Respond with the population records for the specified city as JSON
    res.json(populations);
  } catch (error) {
    // Handle errors that occur during the search operation
    console.error('Error:', error);
    // Respond with a 500 Internal Server Error status and an error message
    res.status(500).json({ error: 'Error searching population records' });
  }
});

// ----------------------------------------------
// (3) insert a new record by city name
// city URI: http://localhost:port/city
app.post('/:city', async (req, res) => {
  try {
    const population = new Population(req.body);
    await population.save();
    res.status(201).json(population);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ----------------------------------------------
// (4) update an existing record by city name
// city URI: http://localhost:port/city
app.put('/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const updatedData = req.body;
    console.log(req.body); // Log request body
    console.log(req.params)

    // Validate if the city name and updated data are provided
    if (!city || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: 'City name and updated data are required' });
    }
    // Debugging output to log incoming request data
    console.log('Incoming PUT request data:');
    console.log('City:', city);
    console.log('Updated Data:', updatedData);
    
    // Find the population document by city name and update all schema elements
    const updatedPopulation = await Population.findOneAndUpdate(
      { city: city }, // Find document by city name
      updatedData, // Updated data object
      { new: true } // Return the updated document
    );

    // Check if the population document is found and updated successfully
    if (!updatedPopulation) {
      return res.status(404).json({ error: 'Population records not found for the specified city' });
    }

    // Respond with the updated population document
    res.json(updatedPopulation);
  } catch (error) {
    // Handle errors that occur during the update operation
    console.error('Error:', error);
    // Respond with a 500 Internal Server Error status and an error message
    res.status(500).json({ error: 'Error updating population records' });
  }
});

// ----------------------------------------------
// (5) Delete a record by city name
// city URI: http://localhost:port/city
app.delete('/:city', async (req, res) => {
  try {
    const city = req.params.city;

    // Validate if the city name is provided
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    // Find and delete the population document by city name
    const deletedPopulation = await Population.deleteOne({ city: city });

    // Check if the population document is found and deleted successfully
    if (deletedPopulation.deletedCount === 0) {
      return res.status(404).json({ error: 'Population records not found for the specified city' });
    }

    // Respond with a success message
    res.json({ message: 'Population records deleted successfully' });
  } catch (error) {
    // Handle errors that occur during the delete operation
    console.error('Error deleting population records:', error);
    // Respond with a 500 Internal Server Error status and an error message
    res.status(500).json({ error: 'Error deleting population records' });
  }
});


// ----------------------------------------------
// Ref: https://expressjs.com/en/4x/api.html#app
// (C)  Create a server such that it binds and
//      listens on a specified host and port.
//      We will use default host and port 3000.

// Start the server on the configured port
// ----------------------------------------------
const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
