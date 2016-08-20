var express = require('express');
var app = express();

var rest = require('./Routers/rest');
var redirect = require('./Routers/redirect');

app.longToShort = {};
app.shortToLong = {};

app.use('/public', express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/:shortUrl', redirect);
app.use('/api/v1', rest);

app.listen(3000);
