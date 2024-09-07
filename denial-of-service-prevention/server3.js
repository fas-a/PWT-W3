const express = require('express');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const app = express();

// Rate limiter configuration
const rateLimiter = new RateLimiterMemory({
    points: 5, // 10 requests
    duration: 1, // per 1 second by IP
    blockDuration: 2, // Block for 2 seconds if over consumed
});

// Rate limiter middleware
app.use((req, res, next) => {
    rateLimiter.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).send('Too Many Requests');
        });
});

// Route handler
app.get('/', (req, res) => {
    console.log(`Request from IP: ${req.ip}`);
    res.send('Hello from Server 3');
});



const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server 2 running on port ${PORT}`);
});