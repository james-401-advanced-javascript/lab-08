'use strict';

const Model = require('./model');
const schema = require('./teams-schema');

class Teams extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Teams;
