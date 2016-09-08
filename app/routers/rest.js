var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlService = require('../services/urlService');
var statsService = require('../services/statsService');

router.post('/urls', jsonParser, function(req, res) {
    var longUrl = req.body.longUrl;
    urlService.getShortUrl(longUrl, function(urlPair) {
        res.json(urlPair);
    });
});

router.get("/urls/:shortUrl", function(req, res) {
    var shortUrl = req.params.shortUrl;
    var longUrl = urlService.getLongUrl(shortUrl, function(urlPair) {
        if (urlPair) {
            res.json(urlPair);
        } else {
            res.status(404).send("You gotta be FUCKING kidding me! ! !");
        }
    });
});

router.get("/urls/:shortUrl/:info", function(req, res) {
    statsService.getUrlInfo(req.params.shortUrl, req.params.info, function(data) {
        res.json(data);
    });
});

module.exports = router;
