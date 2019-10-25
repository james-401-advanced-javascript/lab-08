'use strict';

const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
  // new MongooseSchema
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  _team: { type: mongoose.Schema.Types.ObjectId },
  birthday: { required: true, type: Date },
  likes: {
    required: true,
    type: String,
    lowercase: true,
    enum: ['cats', 'dogs', 'none', 'both'],
  },
});

module.exports = mongoose.model('people', peopleSchema);
