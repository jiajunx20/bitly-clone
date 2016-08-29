var express = require('express');
var router = express.Router();
var urlService = require('../services/urlService');
var stateService = require('../services/stateService');

router.get('*', function(req, res) {
    var shortUrl = req.originalUrl.slice(1);
    var longUrl = urlService.getLongUrl(shortUrl, function(data) {
        if (data) {
            res.redirect(data.longUrl);
            stateService.logRequest(req, shortUrl);
        } else {
            res.sendFile('../public/views/error.html');
        }
    });
});

module.exports = router;
