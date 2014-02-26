// --------------------------------------------------
// Make console.log not error on unsupported browsers
// http://stackoverflow.com/a/5967632/59160
// --------------------------------------------------
define(function (require) {

	var fallback_to_alert = false;
	if (typeof window.console === "undefined") {
		window.console = {};
		if (fallback_to_alert) {
			window.console.log = function(msg) { window.alert(msg); };
			window.console.debug = function(msg) { window.alert(msg); };
		} else {
			window.console.log = function() {};
			window.console.debug = function() {};
		}
	}
});
