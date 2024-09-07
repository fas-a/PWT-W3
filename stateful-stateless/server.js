const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'your_jwt_secret';

// Middleware untuk parsing JSON
app.use(express.json());

// Konfigurasi session untuk autentikasi stateful
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Endpoint untuk autentikasi stateful
app.post('/auth/stateful', (req, res) => {
    req.session.user = { id: 1, username: 'user' };
    res.send('Authenticated with Stateful session!');
});

// Endpoint untuk autentikasi stateless
app.post('/auth/stateless', (req, res) => {
    const token = jwt.sign({ id: 1, username: 'user' }, secretKey, { expiresIn: '1h' });
    res.json({ token });
});

// Memulai server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
