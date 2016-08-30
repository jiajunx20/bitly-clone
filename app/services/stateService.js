var RequestModel = require('../models/requestModel');
var geoip = require('geoip-lite');

var logRequest = function(req, shortUrl) {
    var reqInfo = {};
    reqInfo.shortUrl = shortUrl;
    reqInfo.referer = req.headers.referer || 'Unknown';
    reqInfo.platform = req.useragent.platform || 'Unknown';
    reqInfo.browser = req.useragent.browser || 'Unknown';
    reqInfo.timestamp = new Date();

    var ip = req.headers['x-fowarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.socket.connection.remoteAddress;

    var geo = geoip.lookup(ip);
    if (geo) {
        reqInfo.country = geo.country;
    } else {
        reqInfo.country = 'Unknown';
    }
    var request = new RequestModel(reqInfo);
    request.save();
};

var getUrlInfo = function(shortUrl, info, callback) {
    if (info == 'totalClicks') {
        callback();
    }
};

module.export = {
    logRequest: logRequest
};
