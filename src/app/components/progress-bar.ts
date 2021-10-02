import { module } from "angular";
class ProgressController {
  isIndeterminate;
  value;
  max;

  // Component directive that updates progress bar based on given scope value to watch.
  constructor($scope, $element, $attrs, $timeout) {
    // determine if this progress bar is intended to be indeterminate based on attributes.
    this.isIndeterminate = $attrs.indeterminate !== undefined;
  }
  /*
   ** @summary Allows a default of 1 if 'max' isn't provided.
   ** @param {Number} num    A number (default is ctrl.max).
   */
  getMax() {
    return this.max || 1;
  }

  /*
   ** @summary Returns a number that has been forced to fit within 0 and the current max.
   ** @param {Number} num = A number.
   */
  clamp(num) {
    return Math.max(0, Math.min(this.getMax(), num));
  }

  /*
   ** @summary Returns the 'value' property that has been clamped between 0 and the current max.
   */
  getValue() {
    return this.clamp(this.value);
  }

  inProgress() {
    if (this.isIndeterminate) {
      // value is expected to be "truthy" if progress is complete.
      return !this.value;
    } else {
      return 1 > this.getValue() / this.getMax();
    }
  }
}
export default class ProgressComponent {
  bindings = {
    value: "<",
    max: "<",
    description: "@?",
    indeterminate: "@?",
  };
  templateUrl = require("./progress-bar.html");
  controller = ProgressController;
}
module("tyler-site").component("tbsProgress", new ProgressComponent());
