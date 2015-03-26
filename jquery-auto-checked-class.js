/**
 * CSS rules based on :checked do not dependably update
 * in iOS.  This listens for the state to change of a
 * checkbox and then adds or removes a "checked" class on
 * the input that can be targetted in addition to :checked
 * in css.  
 * 
 * I recommend doing both, so that you can more simply
 * correspond to the initial state.  Aka:
 * 
 *   [type="checkbox"]:checked, [type="checkbox"].checked {
 *   		+ span { background: red; }
 *   }
 *
 * Usage:
 *
 *  $('#main').find('[type="checkbox"]').autoCheckedClass();
 *  $('#main').find('[type="checkbox"]').autoCheckedClass('remove');
 */
define(function (require) {
	
	// Dependencies
	var $ = require('jquery');
	
	/**
	 * Define the function
	 * 
	 * @param  {object} options Supports:
	 *                          - "remove" - Remove event listeners
	 * @return {jQuery}
	 */
	$.fn.autoCheckedClass = function(options) {
		if (options == 'remove') this.off('change', autoCheck);
		else this.on('change', autoCheck);
		return this;
	};

	/**
	 * The handler for the change function which toggles the "checked"
	 * 
	 * @return {void}
	 */
	function autoCheck(e) {
		var $el = $(e.currentTarget);
		$el.toggleClass('checked', $el.is(':checked'));
	}

});