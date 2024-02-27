// ----------------------------------------------
// TCSS 460: Winter 2024
// Backend MongoDB Schema
// ----------------------------------------------
// Use Mongoose to create MongoDB Schema
// ----------------------------------------------

// retrieve necessary files (express and cors)
const mongoose = require('mongoose');

// Create schema for population
const populationSchema = new mongoose.Schema({
  city: { type: String, required: true },
  population: { type: Number, default: 0, min: 0 },
  populationDensity: { type: Number, default: 0, min: 0 },
  populationRank: { type: Number, default: 0, min: 0 },
  populationDensityRank: { type: Number, default: 0, min: 0 },
  landArea: { type: Number, default: 0, min: 0 },
}, { collection: 'population'}); 

const Population = mongoose.model('Population', populationSchema);
module.exports = Population;
