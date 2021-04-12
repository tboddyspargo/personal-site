define(['scripts/app', 'utils/helpers'],
  (ngApp, utils) => {
    function projectController($scope, $http, $rootScope, $sce, $timeout) {
      $scope.name = 'projects';
      $scope.sections = [];
      $scope.progress ||= 1;
      $scope.total_progress = 2;

      $http.get('/scripts/data/projects.json', {})
        .then(({ data, status, statusText, xhrStatus }) => {
          $scope.projects = data;
          $scope.projects_contents = [];
          for (let x = 0; x < $scope.projects.length; x++) {
            $rootScope.images = $scope.projects[x].images;
            $scope.projects_contents.push({ 'name': $scope.projects[x].name, 'id': `project${x}` });
          };
          $scope.sections = $scope.projects_contents.map((i) => i.id);
          $scope.progress += 1;
        }, ({ data, status, statusText, xhrStatus }) => {
          console.warn(`Failed to retrieve 'bio' data. Reason: (${status}) ${statusText}`)
        });

    };

    ngApp.controller('ProjectsCtrl', ['$scope', '$http', '$rootScope', projectController]);
  });
