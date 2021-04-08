define(['scripts/app', 'utils/scroll', 'utils/helpers', 'bootstrap'], function (ngApp, scroll) {
  function projectController($scope, $http, $rootScope, $sce, $timeout) {
    $scope.name = 'projects';
    $rootScope.active = 3;
    $scope.this_progress = $scope.this_progress || 1;
    $rootScope.progress = $scope.this_progress;
    $rootScope.total_progress = 2;
    var x = 0;

    if (!$scope.projects) {
      $http.get('/scripts/data/projects.json', {})
        .success((data) => {
          $scope.projects = data;
          $scope.projects_contents = [];
          for (var x = 0; x < $scope.projects.length; x++) {
            $rootScope.images = $scope.projects[x].images;
            $scope.projects_contents.push({ 'name': $scope.projects[x].name, 'id': `project${x}` });
          };
          $rootScope.sections = $scope.projects_contents.map((i) => { return `${i.id}`; });
          $scope.this_progress += 1; $rootScope.progress = $scope.this_progress;
        });
    } else {
      $rootScope.sections = $scope.projects_contents.map((i) => { return `${i.id}`; });
    }

    if ($rootScope.facts) {
      $rootScope.facts = shuffleArray($rootScope.facts);
      $rootScope.side_facts = $rootScope.facts.slice(0, 5);
    }

  };

  ngApp.controller('ProjectsCtrl', ['$scope', '$http', '$rootScope', projectController]);
});