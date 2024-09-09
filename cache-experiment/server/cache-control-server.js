const express = require('express');
const app = express();
const port = 3002;

let data = "This is the data with Cache-Control";

app.get('/cache-control', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=30'); // Data dapat di-cache selama 30 detik
  res.send(data);
});

app.listen(port, () => {
  console.log(`Cache-Control server listening at http://localhost:${port}`);
});
