'use strict';

const mongoose = require('mongoose');

const people = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  _team: { type: mongoose.Schema.Types.ObjectId, required: false },
  birthday: { type: Date, required: true },
  likes: {
    type: String,
    required: true,
    lowercase: true,
    enum: ['cats', 'dogs', 'none', 'both'],
  },
});

module.exports = mongoose.model('people', people);
