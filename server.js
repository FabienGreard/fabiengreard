var express = require('express'),
    bodyParser  = require('body-parser'),
    morgan  = require('morgan'),
    port    = process.env.PORT || 3000;

var app = express();

app.set('port',port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static(__dirname + '/dist'));

app.listen(app.get('port'), function() {
  console.log('Blog is running here: http://localhost:' + app.get('port'));
});
