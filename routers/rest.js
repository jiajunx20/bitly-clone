var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var urlService = require('../services/urlService');

router.post('/urls', jsonParser, function(req, res) {

    var longUrl = req.body.longUrl;
    urlService.getShortUrl(longUrl, function(shortUrl) {
        res.json({
            longUrl: longUrl,
            shortUrl: shortUrl
        });
    });
});

router.get("urls/:shortUrl", function(req, res) {
    var shortUrl = req.params.shortUrl;
    var longUrl = urlService.getLongUrl(shortUrl, function(url) {
        if (url) {
            res.json(url);
        } else {
            res.status(404).send("You gotta be FUCKING kidding me! ! !");
        }
    });
});

module.exports = router;
