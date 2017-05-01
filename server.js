var express = require('express'),
    bodyParser  = require('body-parser'),
    morgan  = require('morgan'),
    fallback = require('express-history-api-fallback'),
    https = require('https'),
    fs = require('fs'),
    http = require('http');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static(__dirname + '/dist'));
app.use(fallback(__dirname + '/dist/index.html'));


// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/fabiengreard.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/fabiengreard.com/cert.pem')
};

// Create an HTTP service.
http.createServer(app, function(req, res){
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);
