define(['scripts/app', 'utils/scroll'], (ngApp, Scroll) => {
  // configuring targets and scroll behavior for the sidebar navigator links.
  ngApp.component('tbsSidebar', {
    bindings: {
      sections: '<',
      // the id reference strings of elements for which there should be links
      ids: '<'
    },
    templateUrl: '/templates/sidebar.html',
    controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
      const ctrl = this;

      /*
      ** @summary Normalize an array of sections based on either sections or ids given.
      */
      ctrl.final_sections = function () {
        if ($attrs.hasOwnProperty('ids') && Array.isArray(ctrl.ids)) {
          return ctrl.ids.map(id => ({ id: `${id}`.trimStart('#') }));
        }
        if ($attrs.hasOwnProperty('sections') && Array.isArray(ctrl.sections)) {
          return ctrl.sections.map(({ id, name }) => ({ id: `${id}`.trimStart('#'), name }));
        }
        return [];
      };

      /*
      ** @summary Normalize an array of ids from the available sections.
      */
      ctrl.final_ids = () => ctrl.final_sections().map(i => i.id);

      /*
      ** @summary Configure scrolling behavior. Use $timeout to
      **   ensure sufficient cycles have completed for elements to have loaded.
      */



      ctrl.$postLink = function () {
        $timeout(() => {
          $timeout(() => {
            Scroll.configureSectionNavigationBehavior(ctrl.final_ids());
          });
        });
      };
    }]
  });
});
