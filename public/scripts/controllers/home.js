define(['scripts/app', 'utils/scroll', 'utils/helpers'],
  (ngApp, scroll) => {
    function homeController($scope, $http, $rootScope, $sce, $timeout) {
      $scope.name = 'home';
      $scope.progress ||= 1;
      $scope.total_progress = 4;

      if (!$scope.projects) {
        $scope.short_desc = $scope.short_desc || [];
        $http.get('/scripts/data/projects.json', {})
          .then(({ data, status, statusText, xhrStatus }) => {
            $scope.projects = data;
            for (let x = 0; x < $scope.projects.length; x++) {
              $scope.short_desc.push({ name: $scope.projects[x].name, desc: $scope.projects[x].goal, thumbnail: $scope.projects[x].thumbnail, label: 'Project', page: 3, pageLoc: "/projects", loc: `#project${x}` });
            }
            $scope.progress += 1;
            $scope.short_desc = shuffleArray($scope.short_desc);
          }, ({ data, status, statusText, xhrStatus }) => {
            console.warn(`Failed to retrieve 'projects' data. Reason: (${status}) ${statusText}`)
          });
      }

      if (!$scope.about) {
        $scope.short_desc = $scope.short_desc || [];
        $http.get('/scripts/data/about.json', {})
          .then(({ data, status, statusText, xhrStatus }) => {
            $scope.about = data;
            for (let y = 0; y < $scope.about.length; y++) {
              for (x = 0; x < $scope.about[y].entries.length; x++) {
                if ($scope.about[y].heading === 'Education') {
                  $scope.short_desc.push({ name: $scope.about[y].entries[x].name, desc: $scope.about[y].entries[x].description, thumbnail: $scope.about[y].entries[x].thumbnail, label: 'School', page: 2, pageLoc: "/about", loc: `#${$scope.about[y].id}` });
                }
                if ($scope.about[y].heading === 'Employment History') {
                  $scope.short_desc.push({ name: $scope.about[y].entries[x].name, desc: $scope.about[y].entries[x].list[0], thumbnail: $scope.about[y].entries[x].thumbnail, label: 'Job', page: 2, pageLoc: "/about", loc: `#${$scope.about[y].id}` });
                }
              }
              $scope.short_desc = shuffleArray($scope.short_desc);
            }
            $scope.progress += 1;
          }, ({ data, status, statusText, xhrStatus }) => {
            console.warn(`Failed to retrieve 'about' data. Reason: (${status}) ${statusText}`)
          });
      }

      if (!$scope.blurb) {
        $http.get('/scripts/data/blurb.json', {})
          .then(({ data, status, statusText, xhrStatus }) => {
            $scope.blurb = data;
            $scope.progress += 1;
          }, ({ data, status, statusText, xhrStatus }) => {
            console.warn(`Failed to retrieve 'blurb' data. Reason: (${status}) ${statusText}`)
          });
      }
    };

    ngApp.controller('HomeCtrl', ['$scope', '$http', '$rootScope', '$sce', '$timeout', homeController]);
  });
