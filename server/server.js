'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

var sockets = require('./sockets');

var port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use('/', express.static(__dirname + '/../angular/public'));
app.use('/node_modules', express.static(__dirname + '/../angular/node_modules'));

app.use('/api', bodyParser.json());
app.use('/api', require('./controllers'));

app.use(require('./controllers'));

var httpServer = app.listen(port, function() {
    console.log('App listening on port', port);
});

sockets.connect(httpServer);
