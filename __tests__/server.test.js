'use strict';

const { server } = require('../lib/server');
const supertester = require('./supertester.js');
// jest.mock()

const mockServer = supertester(server);
// this is actually server.js > server
// (akin to server.start, we're doing server.server)

describe('web server', () => {
  it('should respond properly on a get request to /people', async () => {
    let results = await mockServer.get('/people');
    expect(results.status).toBe(200);
  });
  it('should respond properly on a post request to /people', async () => {
    let person = {
      firstName: 'Sarah',
      lastName: 'Smalls',
      birthday: '2020-05-10T07:00:00.000Z',
      likes: 'dogs',
      _team: '5da66623c1b7ab45a30e85b7',
    };
    try {
      let data = await mockServer.post('/people').send(person);
      let dbResults = await mockServer.get('/people/Sarah-Smalls');
      expect(data.status).toBe(200);
      expect(dbResults).toBeTruthy();
    } catch (error) {
      console.error(error);
    }
  });
  it('should respond properly on a put request to /people', async () => {
    let person = {
      firstName: 'Sarah',
      lastName: 'Smalls',
      birthday: '2020-05-10T07:00:00.000Z',
      likes: 'dogs',
      _team: '5da66623c1b7ab45a30e85b7',
    };
    try {
      let data = await mockServer.post('/people').send(person);
      let id = data.body._id;
      let updated = await mockServer
        .put('/people/Sarah-Smalls')
        .send(id, { firstName: 'Suzie' });
      let dbResults = await mockServer.get('/people/Suzie-Smalls');
      expect(data.status).toBe(200);
      expect(dbResults).toBeTruthy();
    } catch (error) {
      console.error(error);
    }
  });
  it('should respond properly on a delete request to /people', async () => {
    let person = {
      firstName: 'Sarah',
      lastName: 'Smalls',
      birthday: '2020-05-10T07:00:00.000Z',
      likes: 'dogs',
      _team: '5da66623c1b7ab45a30e85b7',
    };
    try {
      let data = await mockServer.post('/people').send(person);
      let id = data.body._id;
      let updated = await mockServer.delete('/people/Sarah-Smalls').send(id);
      expect(updated.status).toBe(200);
    } catch (error) {
      console.error(error);
    }
  });
  it('should respond properly on a get request to /teams', async () => {
    let results = await mockServer.get('/teams');
    expect(results.status).toBe(200);
  });
  it('should respond properly on a post request to /teams', async () => {
    let team = {
      name: 'Black Panthers',
      color: 'black',
    };
    try {
      let data = await mockServer.post('/teams').send(team);
      let dbResults = await mockServer.get('/teams/Black-Panthers');
      expect(data.status).toBe(200);
      expect(dbResults).toBeTruthy();
    } catch (error) {
      console.error(error);
    }
  });
  it('should respond properly on a put request to /teams', async () => {
    let team = {
      name: 'Black Panthers',
      color: 'black',
    };
    try {
      let data = await mockServer.post('/teams').send(team);
      let id = data.body._id;
      let updated = await mockServer
        .put('/teams/Black-Panthers')
        .send(id, { name: 'Black Pumas' });
      let dbResults = await mockServer.get('/people/Suzie-Smalls');
      expect(data.status).toBe(200);
      expect(dbResults).toBeTruthy();
    } catch (error) {
      console.error(error);
    }
  });
  it('should respond properly on a delete request to /teams', async () => {
    let team = {
      name: 'Black Panthers',
      color: 'black',
    };
    try {
      let data = await mockServer.post('/teams').send(team);
      let id = data.body._id;
      let updated = await mockServer.delete('/teams/Black-Panthers').send(id);
      expect(updated.status).toBe(200);
    } catch (error) {
      console.error(error);
    }
  });
});
