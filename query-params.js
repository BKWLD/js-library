/**
 * Parse all the query parameters out of the current location
 * Taken from: http://stackoverflow.com/a/2880929/59160
 *
 * @param {string} query Optional query params.  If undefined, will be 
 *                       retrieved from the location
 * @return {object} 
 */
define(function (require) {
	return function (query) {
		var match,
				pl     = /\+/g,  // Regex for replacing addition symbol with a space
				search = /([^&=]+)=?([^&]*)/g,
				decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
				query  = query || window.location.search.substring(1),
				urlParams = {};
		while (match = search.exec(query)) urlParams[decode(match[1])] = decode(match[2]);
		return urlParams;
	}
});