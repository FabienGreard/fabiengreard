var express = require('express'),
    bodyParser  = require('body-parser'),
    morgan  = require('morgan'),
    fallback = require('express-history-api-fallback'),
    port    = process.env.PORT || 80;

var app = express();

app.set('port',port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static(__dirname + '/dist'));
app.use(fallback(__dirname + '/dist/index.html'));

app.listen(app.get('port'), function() {
  console.log('Blog is running here: http://localhost:' + app.get('port'));
});
