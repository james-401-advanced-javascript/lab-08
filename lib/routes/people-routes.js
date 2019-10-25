'use strict';

const express = require('express');
const router = express.Router(); // app
const message = require('./message');

const People = require('../models/people.js');
let people = new People();

// GET with Promises
router.get('/', (req, res, next) => {
  people
    .getFromField({})
    .then(data => {
      console.log('DATA: ', data);
      res.send(data);
    })
    .catch(e => e);
});

// GET :id with Async/Await
// people/Sarah
router.get('/:id', async (req, res, next) => {
  let data = await people.get(req.params.id);
  if (data && data.length >= 1) res.send(data);
  else next('route');
});

// GET :firstName with Async/Await
router.get('/:firstName-:lastName', async (req, res, next) => {
  let data = await people.getFromField(req.params);
  res.send(data);
});

router.post('/people', (req, res, next) => {
  people.createPerson(req, res, next);
  message(req, res, next, 'Person created');
});

module.exports = router;
