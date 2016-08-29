var express = require('express');
var router = express.Router();
var urlService = require('../services/urlService');

router.get('*', function(req, res) {
    var shortUrl = req.originalUrl.slice(1);
    var longUrl = urlService.getLongUrl(shortUrl, function(data) {
        if (data) {
            res.redirect(data.longUrl);
        } else {
            res.sendFile('../public/views/error.html');
        }
    });
});

module.exports = router;
