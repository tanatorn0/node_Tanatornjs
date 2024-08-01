const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();

// Load SSL certificates
const privateKey = fs.readFileSync('privatekey.pem', 'utf8');
const certificate = fs.readFileSync('certificate.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

app.get('/', (req, res) => {
    res.send('Hello, HTTPS world!');
});

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

const PORT = 4000;
httpsServer.listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`);
});
