define(['scripts/app', 'utils/scroll', 'utils/helpers'], function (ngApp, scroll) {
  function homeController($scope, $http, $rootScope, $sce, $timeout) {
    $rootScope.active = 1;
    $rootScope.sidebar.contents = [];
    $scope.this_progress = $scope.this_progress || 1;
    $rootScope.progress = $scope.this_progress;
    $rootScope.total_progress = 4;
    var x = 0;

    if (!$scope.projects) {
      $scope.short_desc = $scope.short_desc || [];
      $http.get('/scripts/data/projects.json', {})
        .success(function (data) {
          $scope.projects = data;
          for (x = 0; x < $scope.projects.length; x++) {
            $scope.short_desc.push({ name: $scope.projects[x].name, desc: $scope.projects[x].goal, thumbnail: $scope.projects[x].thumbnail, label: 'Project', page: 3, pageLoc: "/projects", loc: 'project' + x });
          }
          $scope.short_desc = shuffleArray($scope.short_desc);
          $scope.this_progress += 1; $rootScope.progress = $scope.this_progress;
        });
    }

    if (!$scope.about) {
      $scope.short_desc = $scope.short_desc || [];
      $http.get('/scripts/data/about.json', {})
        .success(function (data) {
          $scope.about = data;
          for (var y = 0; y < $scope.about.length; y++) {
            for (x = 0; x < $scope.about[y].entries.length; x++) {
              if ($scope.about[y].heading === 'Education') {
                $scope.short_desc.push({ name: $scope.about[y].entries[x].name, desc: $scope.about[y].entries[x].description, thumbnail: $scope.about[y].entries[x].thumbnail, label: 'School', page: 2, pageLoc: "/about", loc: $scope.about[y].id });
              }
              if ($scope.about[y].heading === 'Employment History') {
                $scope.short_desc.push({ name: $scope.about[y].entries[x].name, desc: $scope.about[y].entries[x].list[0], thumbnail: $scope.about[y].entries[x].thumbnail, label: 'Job', page: 2, pageLoc: "/about", loc: $scope.about[y].id });
              }
            }
            $scope.short_desc = shuffleArray($scope.short_desc);
          }
          $scope.this_progress += 1; $rootScope.progress = $scope.this_progress;
        });
    }

    if (!$scope.blurb) {
      $http.get('/scripts/data/blurb.json', {})
        .success(function (data) {
          $scope.blurb = data;
          $scope.this_progress += 1; $rootScope.progress = $scope.this_progress;
        });
    }

    if ($rootScope.facts) {
      $rootScope.facts = shuffleArray($rootScope.facts);
      $rootScope.side_facts = $rootScope.facts.slice(0, 5);
    }

  };

  ngApp.controller('HomeCtrl', ['$scope', '$http', '$rootScope', '$sce', '$timeout', homeController]);
});