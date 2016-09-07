var UrlModel = require('../models/urlModel');
var redis = require('redis');
var host = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1';
var port = process.env.REDIS_PORT_6379_TCP_PORT || '6379';
var redisClient = redis.createClient(port, host);

var encode = [];

var genCharArray = function(charA, charZ) {
    var arr = [],
        i = charA.charCodeAt(0),
        j = charZ.charCodeAt(0);

    for (; i <= j; i++) {
        arr.push(String.fromCharCode(i));
    }
    return arr;
};

encode = encode.concat(genCharArray('a', 'z'));
encode = encode.concat(genCharArray('A', 'Z'));
encode = encode.concat(genCharArray('0', '9'));

var convertTo62 = function(num) {
    var result = '';
    do {
        result += encode[num % 62];
        num = Math.floor(num / 62);
    } while (num);

    return result;
};

var getLongUrl = function(shortUrl, callback) {
    redisClient.get(shortUrl, function(err, data) {
        if (data) {
            console.log("no more db");
            callback({
                shortUrl: shortUrl,
                longUrl: data
            });
        } else {
            UrlModel.findOne({
                shortUrl: shortUrl
            }, function(err, data) {
                if (data) {
                    callback(data);
                } else {
                    callback(err);
                }
            });
        }
    });
};

var getShortUrl = function(longUrl, callback) {
    if (!longUrl.startsWith('http://')) {
        longUrl = "http://" + longUrl;
    }

    redisClient.get(longUrl, function(err, data) {
        if (data) {
            console.log("no more db");
            callback({
                longUrl: longUrl,
                shortUrl: data
            });
        } else {
            UrlModel.findOne({
                longUrl: longUrl
            }, function(err, data) {
                if (data) {
                    callback(data);
                } else {
                    generateShortUrl(function(shortUrl) {
                        data = new UrlModel({
                            shortUrl: shortUrl,
                            longUrl: longUrl
                        });
                        data.save();
                        redisClient.set(shortUrl, longUrl);
                        redisClient.set(longUrl, shortUrl);
                        callback(data);
                    });
                }
            });
        }
    });
};

var generateShortUrl = function(callback) {
    UrlModel.find({}, function(err, urls) {
        callback(convertTo62(urls.length));
    });
};

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};
