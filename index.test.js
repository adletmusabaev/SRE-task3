const request = require('supertest');
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

let db;
let server;

beforeAll(async () => {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  db = client.db('testdb');
  app.get('/items', async (req, res) => {
    const items = await db.collection('items').find().toArray();
    res.json(items);
  });
  server = app.listen(4000);
});

afterAll(() => {
  server.close();
});

test('GET /items returns empty array initially', async () => {
  const response = await request(app).get('/items');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});