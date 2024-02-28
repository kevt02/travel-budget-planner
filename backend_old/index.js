// ----------------------------------------------
// TCSS 460: Winter 2024
// Backend Population API
// ----------------------------------------------
require('dotenv').config(); 
const express = require("express");
const morgan = require("morgan"); 
const bodyParser = require("body-parser"); 
const cors = require('cors'); 

const mongoose = require('mongoose');

// ----------------------------------------------
// Import route for authentication
// ----------------------------------------------
const authRoutes = require('./routes/authRoutes');

// ----------------------------------------------
// Middleware for logging, parsing body, and handling CORS
// ----------------------------------------------

app.use(morgan('dev'));
app.use(bodyParser.json()); // Parses incoming request bodies in JSON format.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const mongoDBconnectString = "mongodb+srv://testuser:1111@cluster0.aldlabm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoDBconnectString);

// ----------------------------------------------
// Route middleware for authentication
// ----------------------------------------------

app.use('/auth', authRoutes);

// ----------------------------------------------

// Import Express.js, Mongoose, Population Schema
// and CORS

const Population = require('./models/population');




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
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});