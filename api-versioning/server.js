const express = require('express');
const cacheControl = require('express-cache-control');
const app = express();
const port = 3000;

const cache = new cacheControl().middleware;

// URL Path Versioning with Cache
app.get('/v1/users', cache('minutes', 5), (req, res) => {
  res.json({ version: 'v1', data: 'User list version 1' });
});

app.get('/v2/users', cache('minutes', 5), (req, res) => {
  res.json({ version: 'v2', data: 'User list version 2' });
});

app.get('/v3/users', cache('minutes', 5), (req, res) => {
  res.json({ version: 'v3', data: 'User list version 3' });
});

app.get('/v4/users', cache('minutes', 5), (req, res) => {
  res.json({ version: 'v4', data: 'User list version 4' });
});

// Query Parameters Versioning with Cache
app.get('/users', cache('minutes', 5), (req, res) => {
  const version = req.query.version;

  if (version === '1') {
    res.json({ version: 'v1', data: 'User list version 1' });
  } else if (version === '2') {
    res.json({ version: 'v2', data: 'User list version 2' });
  } else if (version === '3') {
    res.json({ version: 'v3', data: 'User list version 3' });
  } else if (version === '4') {
    res.json({ version: 'v4', data: 'User list version 4' });
  } else {
    res.status(400).json({ error: 'Invalid version' });
  }
});

// Custom Headers Versioning with Cache
app.get('/users-header', cache('minutes', 5), (req, res) => {
  const version = req.headers['api-version'];

  if (version === '1') {
    res.json({ version: 'v1', data: 'User list version 1' });
  } else if (version === '2') {
    res.json({ version: 'v2', data: 'User list version 2' });
  } else if (version === '3') {
    res.json({ version: 'v3', data: 'User list version 3' });
  } else if (version === '4') {
    res.json({ version: 'v4', data: 'User list version 4' });
  } else {
    res.status(400).json({ error: 'Invalid version' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
