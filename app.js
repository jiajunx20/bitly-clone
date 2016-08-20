var express = require('express');
var app = express();

var rest = require('./routers/rest');
var redirect = require('./routers/redirect');
var indexRouter = require('./routers/index');

app.longToShort = {};
app.shortToLong = {};

app.use('/public', express.static(__dirname + '/public'));

app.use('/api/v1', rest);
app.use('/', indexRouter);
app.use('/:shortUrl', redirect);

app.listen(3000);
