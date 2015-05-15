var nav_fixed = false;
var origOffsetY = 198;

function scroll() {
	var win = $(window);
	var win_width =  win.innerWidth();
	var scroll_top = win.scrollTop();
	//side_static = (side_static ? side_static : $('#static-sidebar'));
    if (scroll_top > origOffsetY) {
        if (!nav_fixed) {
			nav_fixed = true;
			$('.back-to-top').show();
			$('#navbar-container').removeClass('nav-not-fixed').addClass('nav-fixed');
			$('.sidebar-container').addClass('sidebar-fixed');
			if (win_width >= 768) {
				$('#brand').removeClass('hidden-left');
			}
    	}
	}
	else {
		$('#banner-image').css({backgroundPosition: 'calc(-750px + ((100% - 1280px) / 2)) '+((scroll_top/-3)-100)+'px'});
		if (win_width >= 768) {
			$('#brand').addClass('hidden-left');
		}
		if (nav_fixed) {
			nav_fixed = false;
			$('.back-to-top').hide();
			if (win_width >= 768) {}
			$('.sidebar-container').removeClass('sidebar-fixed');
			$('#navbar-container').removeClass('nav-fixed').addClass('nav-not-fixed');
			
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
