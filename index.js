'use strict';

require('dotenv').config();

// Client >> Server
/**
 * Simply import the server.js file and start the server.
 * @param {number} process.env.PORT
 */
require('./lib/server.js').start(process.env.PORT);
