/**
 * Listen for a click outside, fire callback, and then remove yoself.
 * Based on: http://stackoverflow.com/a/7385673/59160
 *
 * Ex: this.$modal.onClickOutside(this.close);
 */
define(function (require) {
	
	// Dependencies
	var $ = require('jquery')
		, $document = $(document)
	;

	// Plugin definition
	$.fn.onClickOutside = function (callback) {
		var $el = $(this);

		// Wait a tick so that the same click that called this doesn't count as
		// a click outside.
		setTimeout(function() {

			// Add listener
			$document.on('click', function(e) {
				if ($el.is(e.target) || $el.has(e.target).length) return;

				// Remove listener and invoke callback
				$document.off('click', arguments.callee);
				callback();
			});
		}, 1);
	};
});
