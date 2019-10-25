'use strict';

const { server } = require('../lib/server.js');
const supertester = require('./supertester.js');
// jest.mock()

const mockServer = supertester(server);
// this is actually server.js > server
// (akin to server.start, we're doing server.server)

describe('web server', () => {
  it('should respond properly on a get request to /people', () => {
    mockServer
      .get('/people')
      .then(results => {
        console.log('RES: ', results.body);
        expect(results.status).toBe(200);
        expect(results.body.count).toBe(7);
      })
      .catch(console.error);
  });
  it('should respond properly on a post request to /people', async () => {
    let person = {
      firstName: 'Sarah',
      lastName: 'Smalls',
      birthday: '2020-05-10T07:00:00.000Z',
      likes: 'dogs',
      __v: 0,
      _team: '5da66623c1b7ab45a30e85b7',
    };
    try {
      let data = await mockServer.post('/people', person);
      let dbResults = await mockServer.get('/people');
      expect(data.status).toBe(200);
      expect(dbResults[0].firstName).toBe('Sarah');
    } catch (error) {
      console.error(error);
    }
  });
});
