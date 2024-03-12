const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/mainRoute');
const createAccountRoute = require('./routes/createAccountRoute');
const savingsRoute = require('./routes/savingsRoute');
const staysRoute = require('./routes/staysRoute');

// Use routes
app.use('/', authRoutes);
app.use('/auth', authRoutes);
app.use('/createaccount', createAccountRoute);
app.use('/savings', savingsRoute);
app.use('/stays', staysRoute);

const PORT = 2000;

// Swagger JS DOC configuration
const APIDocOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RESTFUL API For Penny Pilot Website',
      description: 'An API for Penny Pilot website',
      version: '1.0.0',
      servers: [`http://localhost:${PORT}`]
    },
    
  },
  apis: ['./routes/*.js'], // Files containing API routes
}



const APIDocs = swaggerJSdoc(APIDocOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(APIDocs));



app.listen(PORT, () => {
  console.log(`Express server is running and listening on port ${PORT}`);
});
