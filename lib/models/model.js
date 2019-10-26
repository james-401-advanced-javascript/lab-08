'use strict';

const mongoose = require('mongoose');

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  get(_id) {
    if (mongoose.Types.ObjectId.isValid(_id))
      return this.schema.findOne({ _id });
    else return null;
  }

  getFromField(query) {
    if (query) {
      console.log('FOUNDIT: ', this.schema.find(query));
      return this.schema.find(query);
    } else {
      console.log('FOUNDIT DER: ', this.schema.find());
      return this.schema.find();
    }
  }

  /**
   *
   * @param {object} item
   * @function create()
   * This function creates a new object in the db
   */
  // CRUD: create
  create(item) {
    // returns a Promise!
    let validatedItem = new this.schema(item);
    return validatedItem.save();
  }

  update(_id, record) {}

  delete(_id) {}

  count(query) {}
}

module.exports = Model;
