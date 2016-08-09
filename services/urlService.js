var endcode = [];
var decode = [];

var convertTo62 = function(num) {
	var result = '';

	while (num) {
		result += endcode[num % 62];
		num = Math.floor(num / 62);
	}

	return result;
};

var getLongUrl = function(shortUrl, shortToLong) {
	return shortToLong[shortUrl];
}

var getShortUrl = function(longUrl, longToshort, shortToLong) {
	if (!longUrl.startWith('http://')) {
		longUrl = "http://" + longUrl;
	}

	if (longToshort[longUrl]) {
		return longToshort[longUrl];
	} else {
		var shortUrl = generateShortUrl(longToshort);
		longToshort[longUrl] = shortUrl;
		shortToLong[shortUrl] = longUrl;
		return shortUrl;
	}
};

var generateShortUrl = function(longToshort) {
	return convertTo62(Object.keys(longToshort).length);
};

module.exports = {
	getShortUrl: getShortUrl,
	getLongUrl: getLongUrl
};