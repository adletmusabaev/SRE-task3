const request = require('supertest');
const app = require('./index');

let server;

beforeAll(() => {
  server = app.listen(3001);
});

afterAll(() => {
  server.close();
});

test('GET /items returns empty array initially', async () => {
  const res = await request(app).get('/items');
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual([]);
});