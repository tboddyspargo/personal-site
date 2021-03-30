define(['ScrollMagic',
    'TweenMax',
    'TimelineMax',
    'animation.gsap',
    'ScrollMagic.debug'],
    function(ScrollMagic, TweenMax, TimelineMax) {
        
        // init controller
        var controller = new ScrollMagic.Controller({
                globalSceneOptions: {
                    triggerHook: "onLeave"
                }
            });
        // 
        new ScrollMagic.Scene({
                triggerElement: '#top',
                offset: 260
            })
            .setClassToggle('#navbar-container', 'nav-fixed')
            .addTo(controller);

        new ScrollMagic.Scene({
                triggerElement: '#top',
                offset: 260
            })
            .setClassToggle('#sidebar-container', 'sidebar-fixed')
            .addTo(controller);

        // banner fade-to-black
        var fadeBlack = TweenMax.to("#banner-cover", 2, {backgroundColor: 'black'});
        new ScrollMagic.Scene({
                triggerElement: '#top',
                offset: 180,
                duration: 120
            })
            .setTween(fadeBlack)
            .addTo(controller);

        // section navigator (side).
        new ScrollMagic.Scene({
            triggerElement: '',
            offset: ,
            duration: ,
        }).setClassToggle('', 'active')
    }
);