define(['scripts/app', 'utils/helpers'],
  (ngApp, utils) => {
    function globalController($rootScope, $http) {

      if (!$rootScope.facts) {
        $http.get('/scripts/data/facts.json', {})
          .then(({ data, status, statusText, xhrStatus }) => {
            $rootScope.facts = shuffleArray(data);
            $rootScope.side_facts = $rootScope.facts.slice(0, 5);
          }, ({ data, status, statusText, xhrStatus }) => {
            console.warn(`Failed to retrieve 'facts' data. Reason: (${status}) ${statusText}`)
          });
      }
    };

    ngApp.controller('SiteCtrl', ['$rootScope', '$http', globalController]);
  });
