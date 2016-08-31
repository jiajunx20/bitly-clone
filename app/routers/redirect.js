var express = require('express');
var path = require('path');
var router = express.Router();
var urlService = require('../services/urlService');
var stateService = require('../services/stateService');

router.get('*', function(req, res) {
    var shortUrl = req.originalUrl.slice(1);
    var longUrl = urlService.getLongUrl(shortUrl, function(data) {
        if (data) {
            res.redirect(data.longUrl);
            // stateService.logRequest(req, shortUrl);
        } else {
            res.sendFile('error.html', {
                root: path.join(__dirname + '/../public/views')
            });
        }
    });
});

module.exports = router;
