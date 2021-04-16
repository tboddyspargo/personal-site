define(['scripts/app'], (ngApp) => {
  function resumeListEntryCtrl($scope, $element, $attrs) {
    const ctrl = this;

  };
  ngApp.component('tbsResumeListEntry', {
    bindings: {
      entry: '<'
    },
    templateUrl: '/components/about/resume-list-entry.html',
    controller: ['$scope', '$element', '$attrs', resumeListEntryCtrl]
  });
});
