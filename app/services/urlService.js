var UrlModel = require('../models/urlModel');

var encode = [];
var decode = [];


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

for (var i = 0; i < encode.length; i++) {
    decode[encode[i]] = i;
}

var convertTo62 = function(num) {
    var result = '';

    do {
        result += encode[num % 62];
        num = Math.floor(num / 62);
    } while (num);

    return result;
};

var getLongUrl = function(shortUrl, callback) {
    UrlModel.findOne({
        shortUrl: shortUrl
    }, function(err, data) {
        if (data) {
            callback(data);
        } else {

        }
    });
};

var getShortUrl = function(longUrl, callback) {
    if (!longUrl.startsWith('http://')) {
        longUrl = "http://" + longUrl;
    }
    UrlModel.findOne({
        longUrl: longUrl
    }, function(err, data) {
        if (data) {
            callback(data);
        } else {
            generateShortUrl(function(shortUrl) {
                var url = new UrlModel({
                    shortUrl: shortUrl,
                    longUrl: longUrl
                });
                url.save();
                callback(url);
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
