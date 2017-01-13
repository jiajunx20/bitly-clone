var requestModel = require('../models/requestModel');
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
    var request = new requestModel(reqInfo);
    request.save();
};

var getUrlInfo = function(shortUrl, info, callback) {
    if (info == 'totalClicks') {
        requestModel.count({
            shortUrl: shortUrl
        }, function(err, data) {
            if (data) {
                callback(data);
            }
        });
        return;
    }

    var groupId = "";

    if (info == 'hour') {
        groupId = {
            year: {
                $year: "$timestamp"
            },
            month: {
                $month: "$timestamp"
            },
            day: {
                $dayOfMonth: "$timestamp"
            },
            hour: {
                $hour: "$timestamp"
            },
            minutes: {
                $minute: "$timestamp"
            }
        };
    } else if (info == 'day') {
        groupId = {
            year: {
                $year: "$timestamp"
            },
            month: {
                $month: "$timestamp"
            },
            day: {
                $dayOfMonth: "$timestamp"
            },
            hour: {
                $hour: "$timestamp"
            }
        };
    } else if (info == "month") {
        groupId = {
            year: {
                $year: "$timestamp"
            },
            month: {
                $month: "$timestamp"
            },
            day: {
                $dayOfMonth: "$timestamp"
            }
        };
    } else {
        groupId = "$" + info;
    }

    requestModel.aggregate([{
        $match: {
            shortUrl: shortUrl
        }
    }, {
        $sort: {
            timestamp: -1
        }
    }, {
        $group: {
            _id: groupId,
            count: {
                $sum: 1
            }
        }
    }], function(err, data) {
        callback(data);
    });
};

module.exports = {
    logRequest: logRequest,
    getUrlInfo: getUrlInfo
};
