// index.test.js
const request = require('supertest');
const app = require('./app');

let server;

beforeAll(done => {
  server = app.listen(3001, done);
});

afterAll(done => {
  server.close(done);
});

test('GET /items returns empty array initially', async () => {
  const res = await request(server).get('/items');
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual([]);
});