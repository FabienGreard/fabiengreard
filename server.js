var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    fallback = require('express-history-api-fallback'),
    https = require('https'),
    fs = require('fs'),
    http = require('http'),
    compression = require('compression');

var app = express();

app.all('*', ensureSecure); // at top of routing calls

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(compression());
app.use('/', express.static(__dirname + '/dist'));
app.use(fallback(__dirname + '/dist/index.html'));

//This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/fabiengreard.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/fabiengreard.com/cert.pem')
};

// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);

// Create an HTTP service.
http.createServer(app).listen(80);

function ensureSecure(req, res, next){
  if(req.secure){
    return next();
  };
  res.redirect('https://' + req.hostname + req.url);
}
