'use strict';

const express = require('express');
const router = express.Router(); // app
const message = require('./message');

const People = require('../../lib/models/people');
let people = new People();

// GET with Promises
router.get('/', message('People retrieved'), async (req, res, next) => {
  try {
    let data = await people.getFromField();
    res.send(data);
  } catch (e) {
    console.error(e);
    res.send(e);
  }
});

// GET :id with Async/Await
// people/Sarah
router.get('/:id', message('Person retrieved'), async (req, res, next) => {
  let data = await people.get(req.params.id);
  if (data && data._id >= 1) res.send(data);
  else next('route');
});

// GET :firstName with Async/Await
router.get(
  '/:firstName-:lastName',
  message('Person retrieved'),
  async (req, res, next) => {
    let data = await people.getFromField(req.params);
    res.send(data);
  }
);

router.post('/', message('Person created'), async (req, res, next) => {
  let data = await people.create(req.body);
  res.send(data);
});

router.put('/', message('Person updated'), async (req, res, next) => {
  let data = await people.update(req.body);
  res.send(data);
});

router.delete('/:id', message('Person deleted'), async (req, res, next) => {
  let data = await people.delete(req.body);
  res.send(data);
});

module.exports = router;
