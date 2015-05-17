define(['jquery'], function($) {
	var nav_fixed = false;
	var origOffsetY = 198;

	function scroll() {
		var win = $(window);
		var win_width =  win.innerWidth();
		var scroll_top = win.scrollTop();
		
	    if (scroll_top > origOffsetY) {
	        if (!nav_fixed) {
				nav_fixed = true;
				$('#back-to-top').show();
				if (win_width >= 768) {
					$('#brand').removeClass('hidden-left');}}
		}
		else {
			$('#banner-image').css({backgroundPosition: 'calc(-750px + ((100% - 1280px) / 2)) '+((scroll_top/1.7)-50)+'px'});
			if (nav_fixed) {
				nav_fixed = false;
				$('#back-to-top').hide();
				if (win_width >= 768) {
					$('#brand').addClass('hidden-left');}
			}
		}
	}

	$(document).ready(function() {
		document.onscroll = scroll;
	    document.ontouchmove = function(event) {
		    // provent body move (ipad)
		    var sourceElement = event.target || event.srcElement;
		    if(!sourceElement.hasClass('enable_touchmove')) {
		      event.preventDefault();
		    }
		};
	});
});