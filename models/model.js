'use strict';

// const schema = require('./people-schema');

class Model {
  constructor(schema) {
    this.schema = schema;
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
   * @function get()
   * This function gets a db entry by id
   */
  // CRUD: read / search - we don't know if it exists
  get(_id) {
    // return a Promise!
    if (_id) return this.schema.findOne({ _id });
    else return this.schema.findOne({});
  }

  /**
   *
   * @param {object} query
   * @function getByQuery()
   * This function gets a db entry by query
   */
  getByQuery(query) {
    // query is an object!
    // ex: {firstName: 'Sarah'}
    console.log('QUERY: ', query);
    if (query) return this.schema.find(query);
    else return this.schema.find({});
  }

  // CRUD: update - you usually only update something that exists
  // if something exists, it has an id
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
    console.log('ID: ', _id);
    console.log('ITEM: ', item);
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
    return this.schema.findByIdAndDelete(_id);
  }

  // takes in an object parameter and return the search result for objects that match the fields in the object parameter
  // Hint: You probably want to use the find() method
  /**
   *
   * @param {object} obj
   * @function getFromField()
   * This function gets entries from db matching query
   */
  getFromField(obj) {
    return this.schema.find(obj);
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
