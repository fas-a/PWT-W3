const express = require('express');
const app = express();
const port = 3001;

let data = "This is the data with ETag";

app.get('/etag', (req, res) => {
  const etag = 'W/"' + new Date().getTime() + '"'; // Contoh ETag, seharusnya menggunakan hash dari data sebenarnya
  res.setHeader('ETag', etag);

  if (req.headers['if-none-match'] === etag) {
    res.sendStatus(304); // Not Modified
  } else {
    res.send(data);
  }
});

app.listen(port, () => {
  console.log(`ETag server listening at http://localhost:${port}`);
});
