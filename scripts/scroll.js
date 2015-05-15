define(['ScrollMagic'], function(ScrollMagic) {
    // init controller
    var controller = new ScrollMagic.Controller({
            globalSceneOptions: {triggerHook: "onCenter"}
        });
    // init scene
    var scene = new ScrollMagic.Scene({
            duration: 300,
            offset: 100
        })
        .addTo(controller);
});