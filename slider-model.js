/*jshint smarttabs:true */
/**
 * A Backbone Model class that ships with methods designed to
 * handle common UI interaction events of Sliders.
 * 
 * Basic usage (would go in a View constructor):
 *
 *    // Initialize manager
 *    this.manager = new SliderModel({
 *       pages: this.$('.jump-link').length
 *    });
 *     
 *    // Handle user interaction
 *    this.$('.left-arrow').hammer().on('tap', this.manager.back);
 *    this.$('.right-arrow').hammer().on('tap', this.manager.next);
 *    this.$('.jump-link').hammer().on('tap', this.manager.jumpFromPagesList);
 *    
 *    // Change the page
 *    this.manager.on('change:page', this.change);
 *
 * - Here's an example of the change handler: https://gist.github.com/weotch/9494115
 * - See the intialize method for a list of configuration options.
 * 
 */
define(function (require) {
  
	// Dependencies
	var $ = require('jquery')
		, _ = require('lodash')
		, Backbone = require('backbone')
	;
	
	// Setup model
	var Model = {};

	// Start on page 0
	Model.defaults = { page: 0 };

	// Pass in configuration in the constructor
	Model.initialize = function(config) {
		_.bindAll(this);

		// Merge defaluts into the config
		this.config = _.merge({

			// If true, hitting next on the last page will take loop around
			// to the first.  And the inverse when using back buttons
			loop: true

			// NOT CURRENTLY IMPLEMENTED, ONLY STUBBING OUT FOR FUTURE
			// Set to a number of seconds to turn on auto advancing
			// and set the number fo seconds between advancing
			, auto_advance_seconds: false
		
		}, config || {});

		// Validate required properties
		var required = ['pages'],
			missing = _.difference(required, _.keys(this.config));
		if (missing.length !== 0) {
			return console.error('slider-manager is missing required configs:', missing);
		}
	};

	// Handle back UI events
	Model.back = function(e) { 
		var page = this.get('page');
		if (page > 0) this.set('page', page-1);
		else if (this.config.loop) this.set('page', this.config.pages-1);
	};

	// Handle next UI events
	Model.next = function(e) { 
		var page = this.get('page');
		if (page < this.config.pages - 1) this.set('page', page+1);
		else if (this.config.loop) this.set('page', 0);
	};

	// Jump directly to a page.  This assumes that this method is directly handling
	// a UI event from an element that is one in a set where each of it's siblings
	// accounts for ALL of the pages in the slider.  That is to say, the config.pages
	// is 5, the e.currentTarget has 4 OTHER siblings.
	Model.jumpFromPagesList = function(e) {
		this.set('page', $(e.currentTarget).index());
	};

	// Return model class
	return Backbone.Model.extend(Model);
});