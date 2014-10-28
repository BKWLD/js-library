/*jshint smarttabs:true */
/**
 * A Backbone Model class that ships with methods designed to
 * handle common UI interaction events of Sliders.
 * 
 * Basic usage (would go in a View constructor):
 *
 *    // Initialize manager
 *    this.manager = new SliderModel({
 *       pages: this.$('.jump-link').length, 
 *       auto_advance_seconds: 4
 *    });
 *     
 *    // Handle user interaction
 *    this.$('.left-arrow').on('tap', this.manager.back);
 *    this.$('.right-arrow').on('tap', this.manager.next);
 *    this.$('.jump-link').on('tap', this.manager.jumpFromPagesList);
 *    this.manager.stopAutoAdvanceOnHoverOf(this.$el);
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
		, $win = $(window)
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

			// Set to a number of seconds to turn on auto advancing
			// and set the number of seconds between advancing
			, auto_advance_seconds: false
		
		}, config || {});

		// Validate required properties
		var required = ['pages'],
			missing = _.difference(required, _.keys(this.config));
		if (missing.length !== 0) {
			return console.error('slider-manager is missing required configs:', missing);
		}

		// If an auto advance seconds number has been set, start the auto
		// advance timer
		if (this.config.auto_advance_seconds) this.enableAutoAdvance(this.config.auto_advance_seconds);
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

	// Register auto advance listeners and begin
	Model.enableAutoAdvance = function(delay) {

		// Set the delay, this allows this function to be called
		// externally
		this.config.auto_advance_seconds = delay;

		// Start and stop on window blur, like when the user switches tabs
		$win.on('blur', this.stopAutoAdvance);
		$win.on('focus', this.startAutoAdvance);

		// Immediately start auto advancing
		this.startAutoAdvance();

	};

	// Register a DOM element that will stop auto advancing when
	// hovered over.
	Model.stopAutoAdvanceOnHoverOf = function($el) {
		$el.on('mouseenter', this.stopAutoAdvance);
		$el.on('mouseleave', this.startAutoAdvance);
	};

	// Start auto-advancing
	Model.startAutoAdvance = function() {

		// Require a second count to be set
		if (!this.config.auto_advance_seconds) return;

		// Stop if there is already an active timer
		if (this.auto_advance_id) return;

		// Start the timer
		this.auto_advance_id = _.delay(function(self) {

			// Show next slide
			self.next();

			// Reset the timer and go again
			self.auto_advance_id = null;
			self.startAutoAdvance();
		}, this.config.auto_advance_seconds * 1000, this);
	};

	// Stop auto-advancing
	Model.stopAutoAdvance = function() {
		if (!this.auto_advance_id) return;
		clearTimeout(this.auto_advance_id);
		this.auto_advance_id = null;
	};

	// Return model class
	return Backbone.Model.extend(Model);
});