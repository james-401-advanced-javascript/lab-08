'use strict';

const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');
const timestamp = require('./routes/timestamp');
const peopleRoutes = require('./routes/people-routes.js');
const teamRoutes = require('./routes/team-routes');
const error404 = require('./routes/404');

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
app.use(express.json());
app.use(timestamp);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use('/people', peopleRoutes);
app.use('/teams', teamRoutes);
// Routes
app.get('/', (req, res, next) => {
  res.send('Homepage');
});

// Error Handling
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use('*', error404);

module.exports = {
  server: app,
  start: start,
};
