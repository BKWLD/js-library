// --------------------------------------------------
// jQuery plugin to simplify Backbone view creation.
// --------------------------------------------------
define(function (require) {
	
	// dependencies
	var $ = require('jquery');
	
	// namespace
	var store = 'jquery-view-inits',
		unique_class_counter = 0;
	
	$.fn.views = function (View, options) {
		
		// Assign a unique id to every backbone view
		if (!View[store]) View[store] = unique_class_counter++;
		return this.each(function () {
			
			// Make sure this element hasn't already initialized this view
			// by checking it against the view's unique id
			var data = $.data(this, store) || $.data(this, store, {});
			if (data[View[store]]) return;

			// Init view
			new View($.extend({ el: this }, options));
			
			// Remember that it was initted
			data[View[store]] = true;
			$.data(this, store, data);
		});
	};
	
});
