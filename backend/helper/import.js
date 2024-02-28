// -----------------------------------------------------------
// TCSS 460: Winter 2024 
// Import Helper or Utility for MongoDB Database
// Designed primarily for TCSS 460
// -----------------------------------------------------------
// Import data from data file (we use './population.json')
// -----------------------------------------------------------
// required libraries
const { MongoClient } = require('mongodb');
const fs = require('fs');   // for filesystem input/output

// -----------------------------------------------------------
// Follow steps A-D to configure tool to import properly
// -----------------------------------------------------------
// .... BEGIN EDITING ....
// ***********************************************************
// (A) specify the name of the data file to be used
var dataFile = '../data/transportation.json';
// ***********************************************************

// ***********************************************************
// (B) Connection string
// ***********************************************************
// replace username, password, and cluster 
// ***********************************************************
const uri = "mongodb+srv://testuser:1111@cluster0.aldlabm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// ***********************************************************
// (C) specify the name of the database (any name)
// ***********************************************************
const dbName = 'test'; 

// ***********************************************************
// (D) specify the name of the collection (any name)
// ***********************************************************
const collectionName = 'transportations'; 
// .... END EDITING ....


// ***********************************************************
// NO NEED TO EDIT BEYOND THIS LINE
// ***********************************************************
// Instantiate MongoClient with connection string
const client = new MongoClient(uri);

// ***********************************************************
// Main function 
// ***********************************************************
async function main() {
  try {
    // Try connecting to the MongoDB server
    await client.connect();
    console.log('You are now connected to MongoDB');

    // Access the database dbName
    const database = client.db(dbName);

    // Access the collection collectionName
    const collection = database.collection(collectionName);

    // We will process data from a file to import it into MongoDB
    const transportationData = fs.readFileSync(dataFile, 'utf8');
    const importDataJSON = JSON.parse(transportationData);

    // For each record in the collection, insert a new record 
    // in the MongoDB database collection
    for (const row of importDataJSON) {
        try {
            const result = await collection.insertOne(row);
            console.log('Inserted document with ID:', result.insertedId);
        }
        catch (error) {
            console.error('Error inserting document:', error);
        }
    }
    console.log('Data import is now completed.');
  } catch (error) {
    console.error('There has been an error:', error);
  } finally {
    try {
      // Try closing the connection 
      await client.close();
      console.log('MongoDB connection is now closed.');
    } catch (error) {
      console.error('There has been an error closing MongoDB connection:', error);
    }
  }
}

// ***********************************************************
// Call the main function
// ***********************************************************
main();


// ***********************************************************
// IMPORT TOOL ENDS
// ***********************************************************
