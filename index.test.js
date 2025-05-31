const request = require('supertest');
const app = require('./index'); // подключаем express-приложение
const { MongoClient } = require('mongodb');

let server;
let db;

beforeAll(async () => {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  db = client.db('testdb');

  // Запускаем сервер на другом порту (для CI и тестов)
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