const express = require('express');
const app = express();

app.use(express.json());

let items = [];

app.get('/items', (req, res) => {
  res.json(items);
});

module.exports = app;