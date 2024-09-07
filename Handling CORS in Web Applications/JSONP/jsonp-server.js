const express = require('express');
const app = express();
const port = 3001;

// Endpoint Root untuk mencegah "Cannot GET /"
app.get('/', (req, res) => {
    res.send('Welcome to the JSONP Server! Access /data for JSONP response.');
});

// Endpoint JSONP
app.get('/data', (req, res) => {
    const callback = req.query.callback;
    const data = { message: "Hello from JSONP Server!" };
    res.send(`${callback}(${JSON.stringify(data)})`);
});

app.listen(port, () => {
    console.log(`JSONP server running at http://localhost:${port}`);
});
