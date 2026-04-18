const express = require('express');
const app = express();
const port = 3000;  

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/data', (req, res) => {
  res.send('wow Data received!');
});

app.get('/health', (req, res) => {
  res.send('wow, Server is healthy!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});