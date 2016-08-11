var express = require('express');
var app = express();

var router = require('./Routers/router');
var redirect = require('./Routers/redirect');
	
app.longToShort = {};
app.shortToLong = {};

app.use('/:shortUrl', redirect);
app.use('/api/v1', router);

app.listen(3000);

