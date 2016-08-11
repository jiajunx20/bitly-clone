var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var urlService = require('../services/urlService');

router.post('/:longUrl',jsonParser, function(req, res) {
	
	var longUrl = req.params.longUrl;
	var shortUrl = urlService.getShortUrl(longUrl, req.app.longToShort, req.app.shortToLong);
	res.json({
		longUrl: longUrl,
		shortUrl: shortUrl,
		longToShort: req.app.longToShort,
		shortToLong: req.app.shortToLong
	});
});

module.exports = router;
