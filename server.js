const express = require('express');
const app = express();
const port = 3000;  

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/data', (req, res) => {
  res.send('Data received!');
});

app.get('/health', (req, res) => {
  res.send('Server is healthy!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});