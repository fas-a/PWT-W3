const express = require('express');
const cors = require('cors');
const app = express();
const port = 3003;

// Endpoint Root untuk mencegah "Cannot GET /"
app.get('/', (req, res) => {
    res.send('Welcome to the CORS Server! Access /data for CORS-enabled response.');
});

// Middleware CORS
app.use(cors({
    origin: 'http://localhost:3000', // Mengizinkan hanya domain lokal ini
    methods: ['GET']
}));

// Endpoint CORS
app.get('/data', (req, res) => {
    res.json({ message: "Hello from CORS-enabled Server!" });
});

app.listen(port, () => {
    console.log(`CORS server running at http://localhost:${port}`);
});
