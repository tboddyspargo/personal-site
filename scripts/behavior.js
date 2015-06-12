define(['jquery'], function($) {
	$(function() {
	    document.ontouchmove = function(event) {
		    // provent body move (ipad)
		    var sourceElement = event.target || event.srcElement;
		    if(!sourceElement.hasClass('enable_touchmove')) {
		      event.preventDefault();
		    }
		};
	});
});