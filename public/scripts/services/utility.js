define(['scripts/app'], (ngApp) => {
  function utilityService() {
    // Module's public return object.
    const Utils = this;

    /* @summary Shuffle an array and return it.
    ** @param [Array] array
    */
    Utils.shuffleArray = function (array) {
      for (let other, nextItem, next = array.length; next; other = Math.floor(Math.random() * next), nextItem = array[--next], array[next] = array[other], array[other] = nextItem);
      return array;
    };
  }

  ngApp.service('UtilityService', [utilityService]);
});
