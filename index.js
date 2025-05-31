const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

const uri = 'mongodb://localhost:27017';  // локальная MongoDB, для GitHub Actions будет отдельный сервис
const client = new MongoClient(uri);

let db;

app.get('/', (req, res) => {
  res.send('Hello CI!');
});

app.get('/items', async (req, res) => {
  const items = await db.collection('items').find().toArray();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const item = req.body;
  const result = await db.collection('items').insertOne(item);
  res.json(result);
});

async function start() {
  await client.connect();
  db = client.db('testdb');
  app.listen(3000, () => console.log('Server started on port 3000'));
}

start().catch(console.error);