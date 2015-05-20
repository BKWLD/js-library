/**
 * Any external links or links with file extensions will 
 * open in new window on click. 
 */
define(function (require) {

	var _ = require('lodash')
	,	host = location.host
	,	pattern = /^(https?:\/\/[^\/]+)?\/.+\.\w{3,4}$/mg;

	/**
	 * Handler for external links or files on click
	 * @param  Event e Click event object
	 */
	onExternalLinkClick = function(e) { 
		e.preventDefault();

		// open in new window
		window.open($(e.currentTarget).attr('href'), '_blank');
	};

	// Loop through every link on the page
	_.each($('a'), function(el,i) {
		var $a = $(el);
		var href = $a.attr('href');

		// Check for internal links
		if( 
			// undefined HREF 
			(typeof(href) == 'undefined' ||

			// on this domain
			href.match(host) || 
			
			// nothing
			href == '' ||	
			
			// a mailto link
			/^mailto:/.test(href) ||
			
			// relative anchor	 
			href[0] == '#' ||
			
			// absolute URI path
			href[0] == '/') &&

			// AND check for a match for any file extensions
			!pattern.test(href)

		) return;

		//register handler
		$a.on('click', onExternalLinkClick);
	});

});
