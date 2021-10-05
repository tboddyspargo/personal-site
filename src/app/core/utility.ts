"use strict";
console.debug("Loading utility service...");

export default class UtilityService {
  /* @summary Shuffle an array and return it.
   ** @param [Array] array
   */
  shuffleArray(array: Array<any>) {
    for (
      let other, nextItem, next = array.length;
      next;
      other = Math.floor(Math.random() * next),
        nextItem = array[--next],
        array[next] = array[other],
        array[other] = nextItem
    );
    return array;
  }
}
