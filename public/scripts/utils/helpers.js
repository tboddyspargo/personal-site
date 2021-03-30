define([], function() {
    function shuffleArray(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    // leak global functions to the window object.
    window.shuffleArray = shuffleArray;
    return {
        shuffleArray: shuffleArray
    };
});