// --------------------------------------------------
// Adds a property to the window to determine if you're on a mobile device
// --------------------------------------------------
define(function (require) {
	window.mobilecheck = function() {
		if( navigator.userAgent.match(/Android/i)
		 || navigator.userAgent.match(/webOS/i)
		 || navigator.userAgent.match(/iPhone/i)
		 || navigator.userAgent.match(/iPad/i)
		 || navigator.userAgent.match(/iPod/i)
		 || navigator.userAgent.match(/BlackBerry/i)
		 || navigator.userAgent.match(/Windows Phone/i)
		 ){
		  return true;
		}
		else {
		  return false;
		}
	}
	window.isIOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
	window.isMobile = window.mobilecheck();
});