# BKWLD JS Library

**This library is being deprecated in favor of [many, smaller repos](https://github.com/BKWLD)**

JS utils packaged as AMD modules.  Add a path to this dir in your main.js so you can reference them easier.

	//main.js
	require.config({
		paths: {
			bkwld: 'vendor/bkwld-js-library'
		}
	});

	// From a module
	define(function (require) {
		require('bkwld/csrf');
	});
