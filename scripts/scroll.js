define(['ScrollMagic',
    'TweenMax',
    'TimelineMax',
    'animationGSAP',
    'ScrollMagic.debug'],
    function(ScrollMagic,
            TweenMax,
            TimelineMax) {
    
    // init controller
    var controller = new ScrollMagic.Controller({
            globalSceneOptions: {triggerHook: "onLeave"}
        });
    // init scene
    
    new ScrollMagic.Scene({triggerElement: '#top',offset: 260})
        .setClassToggle('#navbar-container', 'nav-fixed')
        .addTo(controller);

    new ScrollMagic.Scene({triggerElement: '#top',offset: 260})
        .setClassToggle('#sidebar-container', 'sidebar-fixed')
        .addTo(controller);

    var fadeBlack = TweenMax.to("#banner-cover", 2, {backgroundColor: 'black'});
    new ScrollMagic.Scene({
            triggerElement: '#top',
            offset: 180,
            duration: 120
        })
        .setTween(fadeBlack)
        .addTo(controller);

});