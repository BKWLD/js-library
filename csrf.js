// --------------------------------------------------
// Look for a meta tag called "csrf" and add it's
// value to all AJAX requests as a header
// --------------------------------------------------
define(function (require) {
	var $ = require('jquery');

	// Get the CSRF token from the meta tags
	var csrf = $('meta[name="csrf-token"]').attr('content') // Laravel 5
		|| $('meta[name="csrf"]').attr('content'); // Laravel 4
	if (!csrf) return;

	// Apply to all AJAX requests
	$.ajaxPrefilter(function(options) {
		var headers = options.headers || {};
		headers['x-csrf-token'] = csrf; // Laravel 5
		headers['x-csrf'] = csrf; // Laravel 4
		options.headers = headers;
	});
});
