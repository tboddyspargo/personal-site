define([], function () {
  // Module's public return object.
  const Helpers = {};

  /* @summary Shuffle an array and return it.
  ** @param [Array] array
  */
  Helpers.shuffleArray = function (array) {
    for (let other, nextItem, next = array.length; next; other = Math.floor(Math.random() * next), nextItem = array[--next], array[next] = array[other], array[other] = nextItem);
    return array;
  };

  return Helpers;
});
