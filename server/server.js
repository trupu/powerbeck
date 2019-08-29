const app = require('./app');
const fs = require('fs');
const path = require('path');

// protocols

const http = require('http');
const https = require('https');

// keys

const privateKey = fs.readFileSync(path.join(__dirname, 'key.pem'));
const certificate = fs.readFileSync(path.join(__dirname, 'server.crt'));

const credentials = {key: privateKey, cert: certificate};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

app.set('port', process.env.PORT || 5000);

httpServer.listen(9000);
const server = httpsServer.listen(app.get('port'), () => {
    console.log(`Listening on ${server.address().port}...`);
});

/*
app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), () => {
    console.log(`Listening on ${server.address().port}!`);
});
*/
