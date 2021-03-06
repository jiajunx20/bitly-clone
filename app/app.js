var express = require('express');
var app = express();
var rest = require('./routers/rest');
var redirect = require('./routers/redirect');
var indexRouter = require('./routers/index');
var mongoose = require('mongoose');
var useragent = require('express-useragent');

mongoose.connect('mongodb://jiajun_admin:jiajun@ds061375.mlab.com:61375/tinyurl');

app.use('/node_modules', express.static(__dirname + "/node_modules"));

app.use('/public', express.static(__dirname + "/public"));

app.use(useragent.express());

app.use('/api/v1', rest);

app.use('/', indexRouter);

app.use('/:shortUrl', redirect);

app.listen(3000);
