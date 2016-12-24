var express = require('express'),
    bodyParser  = require('body-parser'),
    morgan  = require('morgan'),
    port    = process.env.PORT || 3000;

var app = express();

app.set('port',port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
    if (err.constructor.name === 'UnauthorizedError') {
      res.send(401, 'Unauthorized');
    }
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, HEAD, DELETE');
     res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, content-type, Accept');
     next();
   });


app.use(morgan('dev'));

app.use(express.static(__dirname + '/dist'));

app.get('/api', function(req, res) {
    res.send('Welcome, however this is an api, nothing to see there...');
});



app.listen(app.get('port'), function() {
  console.log('We all love ami here: http://localhost:' + app.get('port'));
});
