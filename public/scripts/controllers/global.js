define(['scripts/app', 'utils/helpers', 'utils/scroll'], (ngApp, utils, scroll) => {
  function globalController($sce, $rootScope, $http, $document) {
    $rootScope.showViewer = false;
    $rootScope.sidebar = {
      heading: 'Contents',
      contents: []
    };

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

    $rootScope.makeActive = function (index) {
      $rootScope.active = index;
    };

    $rootScope.displayViewer = function (images) {
      if (images) { $rootScope.images = images; }
      $rootScope.showViewer = true;
      angular.element(document).find('body').addClass('no-scroll');
    };

    $rootScope.hideViewer = function () {
      $rootScope.showViewer = false;
      angular.element(document).find('body').removeClass('no-scroll');
      $rootScope.showViewer = false;
    };

    $rootScope.isActive = function (index) {
      return $rootScope.active === index;
    };

    $rootScope.deliberatelyTrustDangerousSnippet = function (item) {
      return $sce.trustAsHtml(item);
    };

  };

  ngApp.controller('SiteCtrl', ['$sce', '$rootScope', '$http', '$document', globalController]);
});