'use strict';

const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');
const timestamp = require('./routes/timestamp');
const peopleRoutes = require('./routes/people-routes.js');
const teamRoutes = require('./routes/team-routes');
const error404 = require('./routes/404');

/**
 * Function takes in an optional port number as a parameter
 * If no port number is provided, it will either use the PORT environment variable or default to 3000
 * After that, the function connects to Mongoose middleware that will in turn connect to our Mongo db
 * The config object is created and passed to mongoose.connect to deal with deprecation warnings
 * @function start(port)
 * @param {number} port
 */
const start = port => {
  port = port || process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
  });

  const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

  mongoose
    .connect(process.env.MONGODB_URI, config)
    .then(() => console.log('DB Connected!'))
    .catch(err => {
      console.log(`DB Connection Error: ${err.message}`);
    });
};

// Models

// App Level MW
/**
 * This function ensures that all requests and responses to and form the server are converted to JSON objects
 * This is an express specific function
 * @function express.json()
 */
app.use(express.json());
app.use(timestamp);

/**
 * This is a built-in middleware function in Express that parses incoming requests with urlencoded payloads and is based on body-parser.
 * It returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
 * @function express.urlencoded()
 * @param {object}
 */
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

/**
 * This middleware is allowing express routing to be used within the server.js file
 * A collection of endpoints related to a specified route or path
 * This allows all of the functionality at the /people and /teams endpoints to be used within server.js
 */
app.use('/people', peopleRoutes);
app.use('/teams', teamRoutes);
// Routes
app.get('/', (req, res, next) => {
  res.send('Homepage');
});

// Error Handling
/**
 * Implement error handling middleware for 404 and 500 errors
 */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use('*', error404);

module.exports = {
  server: app,
  start: start,
};
