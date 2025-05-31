const express = require('express');
const app = express();

app.use(express.json());

const items = []; // временное хранилище

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const item = req.body;
  items.push(item);
  res.status(201).json(item);
});

// Если файл запускается напрямую — запускаем сервер
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}

// Экспортируем app для тестов
module.exports = app;