$(document).ready(function() {
	win = $(window);
	
    document.onscroll = scroll;
    document.ontouchmove = function(event) {
	    // provent body move (ipad)
	    var sourceElement = event.target || event.srcElement;
	    if(!angular.element(sourceElement).hasClass('enable_touchmove')) {
	      e.preventDefault();
	    }
	};
});


var nav_fixed = false;
var origOffsetY = 198;

scroll = function () {
		win = $(window);
		win_width =  win.innerWidth();
		scroll_top = win.scrollTop();
		//side_static = (side_static ? side_static : $('#static-sidebar'));
        if (scroll_top > origOffsetY) {
            if (!nav_fixed) {
				nav_fixed = true;
				$('.back-to-top').show();
				$('#navbar').removeClass('nav-not-fixed').addClass('nav-fixed');
				$('.sidebar-container').addClass('sidebar-fixed');
				if (win_width >= 768) {
					$('#brand').removeClass('hidden-left');
				}
        	}
		}
		else {
			$('#banner-image').css({backgroundPosition: 'calc(-750px + ((100% - 1280px) / 2)) '+((scroll_top/-3)-100)+'px'})
			if (win_width >= 768) {
				$('#brand').addClass('hidden-left');
			}
			if (nav_fixed) {
				nav_fixed = false;
				$('.back-to-top').hide();
				if (win_width >= 768) {}
				$('.sidebar-container').removeClass('sidebar-fixed');
				$('#navbar').removeClass('nav-fixed').addClass('nav-not-fixed');
				
			}
		}
    }
