define(['scripts/app', 'utils/helpers', 'utils/scroll'], (ngApp, utils, scroll) => {
  function globalController($sce, $rootScope, $http, $document) {

    if (!$rootScope.links) {
      $http.get('/scripts/data/links.json', {})
        .success(function (data) {
          $rootScope.links = data;
        });
    }
    if (!$rootScope.blogs) {
      $http.get('/scripts/data/blogs.json', {})
        .success(function (data) {
          $rootScope.blogs = data;
        });
    }

    if (!$rootScope.facts) {
      $http.get('/scripts/data/facts.json', {})
        .success(function (data) {
          $rootScope.facts = shuffleArray(data);
          $rootScope.side_facts = $rootScope.facts.slice(0, 5);
        });
    }

    $rootScope.deliberatelyTrustDangerousSnippet = function (item) {
      return $sce.trustAsHtml(item);
    };

  };

  ngApp.controller('SiteCtrl', ['$sce', '$rootScope', '$http', '$document', globalController]);
});
