/**
 * Show and hide elements when other elements are clicked.
 *
 * map(array mapping);
 * 
 * 		Provide a mapping of elements to OTHER elements that should be shown
 * 		when clicked. `mapping` is an array of objects that look like: 
 * 		`{ on: $el, show: $el}`.  When the on $el is clicked, all the `show`
 * 		$elements but the one one in the pairin are hidden.
 *
 * 		Example:
 *
 * 			require('toggleable').map([
 * 				{ on: $('.one'), show: $('other') },
 * 				{ on: $('.two'), show: $('another') }
 * 			]).showFirst();
 * 		
 */
define(function (require) {

	// Dependencies
	var $ = require('jquery')
		, _ = require('lodash')
		, hammerjs = require('jquery-hammerjs')
	;

	// Setup toggleablility given a mapping array of objects
	function map(mapping) {

		// Make a jquery collection of all of the toggleable elements
		var $toggleables = _.reduce(mapping, function($set, pair) {
			return $set.add(pair.show);
		}, $());

		// Loop through the mappings and assign click listeners
		_.each(mapping, function(pair) {

			// Required properties
			if (!_.has(pair, 'on') || !_.has(pair, 'show')) 
				return console.error('Both "on" and "show" need to be defined on each toggleable pair');

			// Assign listener, assume that on and show are already
			// wrapped in jQuery.
			pair.on.hammer().on('tap', function() {
				
				// Hide everything but the selection
				$toggleables.not(pair.show).hide();

				// Then show the selected one
				pair.show.show();
			});

		});

		// Return a new MapFactory instance
		return new MapFactory(mapping);

	}

	// This class constructor wraps a mapping definition and lets other methods
	// to be chained onto it
	function MapFactory(mapping) {
		this.mapping = mapping;
		return { showFirst: _.bind(showFirst, this) }
	}

	// Enable the first item in a mapping
	function showFirst() {
		this.mapping[0].show.show();
	}

	// API of the module
	return { map: map };

});