'use strict';

const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');
const timestamp = require('./routes/timestamp');
const peopleRoutes = require('./routes/people-routes.js');
// const teamRoutes = require('./routes/team-routes');

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
// Routes
app.get('/', (req, res, next) => {
  res.send('Homepage');
});

// Error Handling

module.exports = {
  server: app,
  start: start,
};
