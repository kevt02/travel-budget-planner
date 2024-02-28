// ----------------------------------------------
// TCSS 460: Winter 2024
// Backend Population API
// ----------------------------------------------
// Use MongoDB as a cloud database
// ----------------------------------------------

// Import Express.js, Mongoose, Population Schema
// and CORS
const express = require('express');
const mongoose = require('mongoose');
const Population = require('./models/population');
const cors = require('cors');
const Users = require('./models/users');

// Create an express application instance
// This represents the Backend API
const app = express();

// Parse incoming request bodies with JSON payloads
// Each pasrsed JSON will be available in req.body
app.use(express.json()); 


// Enable Cross Origin requests in Express.js app
// Allow requests from any origin (allow all origins)
app.use(cors());

// Set the port number 
const PORT = 2000;

// MongoDB ConnectionS String
const mongoDBconnectString = "mongodb+srv://testuser:1111@cluster0.aldlabm.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoDBconnectString);

// Develop the routes

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
// Ref: https://expressjs.com/en/4x/api.html#app
// (C)  Create a server such that it binds and
//      listens on a specified host and port.
//      We will use default host and port 3000.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
