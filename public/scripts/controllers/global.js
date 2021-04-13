define(['scripts/app', 'utils/helpers'],
  (ngApp, utils) => {
    function globalController($rootScope, $http) {

      if (!$rootScope.facts) {

      }
    };

    ngApp.controller('SiteCtrl', ['$rootScope', '$http', globalController]);
  });
