// index.test.js
if (process.env.CI !== 'true') {
  const request = require('supertest');
  const { MongoClient } = require('mongodb');
  const app = require('./index'); // или require('./app'), зависит от структуры

  let server, db;

  beforeAll(async () => {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    db = client.db('testdb');
    server = app.listen(3001);
  });

  afterAll(() => {
    server.close();
  });

  test('GET /items returns empty array initially', async () => {
    const res = await request(server).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
}