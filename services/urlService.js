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

var getLongUrl = function(shortUrl, shortToLong) {
	return shortToLong[shortUrl];
};

var getShortUrl = function(longUrl, longToshort, shortToLong) {
	if (!longUrl.startsWith('http://')) {
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