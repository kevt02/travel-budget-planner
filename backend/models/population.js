// ----------------------------------------------
// TCSS 460: Winter 2024
// Backend MongoDB Schema
// ----------------------------------------------
// Use Mongoose to create MongoDB Schema
// ----------------------------------------------

// retrieve necessary files (express and cors)
const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  paymentInfo: { type: String, required: true },
  accountBalance: { type: Number, required: true }
});

// Goals Schema
const goalsSchema = new mongoose.Schema({
  budget: { type: Number, required: true },
  city: { type: String, required: true },
  maxDuration: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Transportation Schema
const transportationSchema = new mongoose.Schema({
  travelType: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  price: { type: Number, required: true },
  startCity: { type: String, required: true },
  endCity: { type: String, required: true }
});

// Property Schema
const propertySchema = new mongoose.Schema({
  address: { type: String, required: true },
  name: { type: String, required: true },
  propertyType: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  goal: { type: mongoose.Schema.Types.ObjectId, ref: 'Goals' }
});

// Transportation Tickets Schema
const transportationTicketsSchema = new mongoose.Schema({
  seat: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Property Ticket Schema
const propertyTicketSchema = new mongoose.Schema({
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Travel Preference Schema
const travelPreferenceSchema = new mongoose.Schema({
  transportationMethod: { type: String, required: true },
  layover: { type: Boolean, required: true },
  propertyRating: { type: Number, required: true },
  cabinRating: { type: Number, required: true },
  propertyType: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Exporting models
const User = mongoose.model('User', userSchema);
const Goals = mongoose.model('Goals', goalsSchema);
const Transportation = mongoose.model('Transportation', transportationSchema);
const Property = mongoose.model('Property', propertySchema);
const TransportationTickets = mongoose.model('TransportationTickets', transportationTicketsSchema);
const PropertyTicket = mongoose.model('PropertyTicket', propertyTicketSchema);
const TravelPreference = mongoose.model('TravelPreference', travelPreferenceSchema);

module.exports = {
  User,
  Goals,
  Transportation,
  Property,
  TransportationTickets,
  PropertyTicket,
  TravelPreference
};
