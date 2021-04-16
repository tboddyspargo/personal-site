define(['scripts/app'], (ngApp) => {
  // Component directive that updates progress bar based on given scope value to watch.
  function progressCtrl($scope, $element, $attrs, $timeout) {
    const ctrl = this;

    // determine if this progress bar is intended to be indeterminate based on attributes.
    ctrl.isIndeterminate = $attrs.indeterminate !== undefined;

    /*
    ** @summary Allows a default of 1 if 'max' isn't provided.
    ** @param {Number} num    A number (default is ctrl.max).
    */
    ctrl.getMax = () => ctrl.max || 1;

    /*
    ** @summary Returns a number that has been forced to fit within 0 and the current max.
    ** @param {Number} num = A number.
    */
    function clamp(num) {
      return Math.max(0, Math.min(ctrl.getMax(), num));
    };

    /*
    ** @summary Returns the 'value' property that has been clamped between 0 and the current max.
    */
    ctrl.getValue = () => {
      return clamp(ctrl.value);
    };

    ctrl.inProgress = function () {
      if (ctrl.isIndeterminate) {
        // value is expected to be "truthy" if progress is complete.
        return !ctrl.value;
      } else {
        return 1 > (ctrl.getValue() / ctrl.getMax());
      }
    };
  };

  ngApp.component('tbsProgress', {
    bindings: {
      value: '<',
      max: '<',
      description: '@?',
      indeterminate: '@?'
    },
    templateUrl: '/templates/loading.html',
    controller: ['$scope', '$element', '$attrs', '$timeout', progressCtrl]
  });
});
