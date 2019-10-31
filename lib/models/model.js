'use strict';

const mongoose = require('mongoose');

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * This function uses mongoose to verify an id is a vallid UUID
   * If the id is valid, it finds the entry matching that id in the mongo db
   * @param {uuid} _id
   */
  get(_id) {
    if (mongoose.Types.ObjectId.isValid(_id))
      return this.schema.findOne({ _id });
    else return null;
  }

  /**
   * This function takes in a query, and places it inside of an object
   * That object is then used as the query to the mongo collection for the model this function is called on
   * If no query is passed to the function, it simply returns the entire collection
   * @param {object} query
   */
  getFromField(query) {
    if (query) {
      return this.schema.find(query);
    } else {
      return this.schema.find();
    }
  }

  /**
   * This function creates a new object/entry/document in the db
   * The collection the document is created inside of depends on which model this function is called by
   * @param {object} item
   */
  // CRUD: create
  create(item) {
    // returns a Promise!
    let validatedItem = new this.schema(item);
    return validatedItem.save();
  }

  /**
   * This function finds an item in the db by id, and updates it with the parameters passed in to the second argument position
   * @param {uuid} _id
   * @param {object} item
   * @function update()
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
   * This function finds an item in the db by id, and deletes it
   * @param {uuid} _id
   * @function delete()
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
