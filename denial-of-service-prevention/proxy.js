const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Define servers
const servers = [
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002'
];

// Create a server that will handle incoming requests and distribute them to the backend servers
const server = http.createServer((req, res) => {
    const target = servers[Math.floor(Math.random() * servers.length)];
    proxy.web(req, res, { target });
});

server.listen(8081, () => {
    console.log('Proxy server running on port 8081');
});
