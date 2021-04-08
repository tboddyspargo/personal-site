define([], function() {
	document.ontouchmove = function(event) {
		// prevent body move (ipad)
		var sourceElement = event.target || event.srcElement;
		if(!sourceElement.hasClass('enable_touchmove')) {
			event.preventDefault();
		}
	};
});