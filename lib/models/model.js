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
      return this.schema.find(query);
    } else {
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

  /**
   *
   * @param {uuid} _id
   * @param {object} item
   * @function update()
   * This function updates a db entry
   */
  update(_id, item) {
    // change a piece of the data
    // change data where data.id === id
    // [async] write data to file
    // make sure your change is in this.database
    // write this.database to file
    // look up findByIdAndUpdate
    return this.schema.findByIdAndUpdate(_id, { ...item });
  }

  // CRUD: delete
  /**
   *
   * @param {uuid} _id
   * @function delete()
   * This function deletes a db entry by id
   */
  delete(_id) {
    // find this.database object where object.id === id (forEach??)
    // remove that object (map??)
    // [async] write the new (smaller) this.database to the file
    // look up findByIdAndDelete
    if (mongoose.Types.ObjectId.isValid(_id))
      return this.schema.findByIdAndDelete(_id);
    else if (String(_id)) return this.schema.find(_id);
    else return null;
  }

  // take in an object parameter, and search the database for items that match the object paramter.
  // return the number of items that match.
  /**
   *
   * @param {object} obj
   * @function count()
   * This function counts all the number of items in the db if passed no parameters, and only numbers of items matching parameter if passed one
   */
  count(obj) {
    return this.schema.countDocuments(obj);
  }
}

module.exports = Model;
