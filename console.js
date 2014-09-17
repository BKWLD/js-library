// --------------------------------------------------
// Make console.log not error on unsupported browsers
// http://stackoverflow.com/a/5967632/59160
// --------------------------------------------------
define(function (require) {
	if (typeof window.console === "undefined") {
		window.console = {
			log : function() {},
			debug :function() {},
			error : function() {},
			warn : function() {},
			info : function() {}
		};
	}
});
