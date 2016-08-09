var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var urlService = require('../services/urlService');

router.get('*', function(req, res) {
	var shortUrl = req.originalUrl.slice(1);
	var longUrl = getLongUrl(shortUrl, req.app.shortToLong); // implement this
	res.redirect(longUrl);
});

router.post('/urls', function(req, res) {
	var longUrl = req.body.longUrl;
	// implement 
	var shortUrl = getShortUrl(longUrl, req.app.longToShort, req.app.shortToLong);
	res.json({
		longUrl: req.body.longUrl,
		shortUrl: shortUrl
	})
});

module.exports = router;