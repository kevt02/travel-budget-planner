const express = require("express");
const cors = require("cors");
const dbConnection = require("./config.js");
var bodyParser = require('body-parser');
const app = express(express.json);



// ----------------------------------------------
// Import route for authentication
// ----------------------------------------------
const authRoutes = require('./routes/mainRoute');
const createAccountRoute = require('./routes/createAccountRoute');
const savingsRoute = require('./routes/savingsRoute');
const staysRoute = require('./routes/staysRoute');

app.use(cors());
app.use(bodyParser.json());



// ----------------------------------------------
// Route middleware for authentication
// ----------------------------------------------

app.use('/auth', authRoutes);
app.use('/createaccount', createAccountRoute);
app.use('/savings', savingsRoute);
app.use('/stays', staysRoute);




app.listen(2000, () => {
  console.log("Express server is running and listening");
});