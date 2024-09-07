const express = require('express');
const axios = require('axios'); // Menggunakan axios sebagai pengganti request
const app = express();
const port = 3002;

// Endpoint Root untuk mencegah "Cannot GET /"
app.get('/', (req, res) => {
    res.send('Welcome to the Proxy Server! Access /proxy for proxied data.');
});

// Endpoint Proxy
app.get('/proxy', async (req, res) => {
    try {
        console.log('Mengirim permintaan ke URL target...');
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        console.log('Data berhasil diterima:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error saat mengambil data dari server target:', error.message);
        res.status(500).send("Error fetching data from target server.");
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
