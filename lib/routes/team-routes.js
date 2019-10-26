'use strict';

const express = require('express');
const router = express.Router(); // app
const message = require('./message');

const Teams = require('../../lib/models/teams');
let teams = new Teams();

// GET with Promises
router.get('/', message('Teams retrieved'), async (req, res, next) => {
  try {
    let data = await teams.getFromField();
    res.send(data);
  } catch (e) {
    console.error(e);
    res.send(e);
  }
});

// GET :id with Async/Await
// teams/Sarah
router.get('/:id', message('Team retrieved'), async (req, res, next) => {
  let data = await teams.get(req.params.id);
  if (data && data._id >= 1) res.send(data);
  else next('route');
});

// GET :firstName with Async/Await
router.get('/:name', message('Team retrieved'), async (req, res, next) => {
  let data = await teams.getFromField(req.params);
  res.send(data);
});

router.post('/', message('Team created'), async (req, res, next) => {
  let data = await teams.create(req.body);
  res.send(data);
});

router.put('/:id', message('Team updated'), async (req, res, next) => {
  let data = await teams.update(req.body._id, req.body);
  res.send(data);
});

router.delete('/:id', message('Team deleted'), async (req, res, next) => {
  let data = await teams.delete(req.body);
  res.send(data);
});

module.exports = router;
