define(['scripts/app', 'utils/helpers'],
  (ngApp, utils) => {
    function aboutController($scope, $http, $rootScope) {
      $scope.name = 'about';
      $scope.sections = [];
      $scope.progress ||= 1;
      $scope.total_progress = 3;
      $scope.facts = [];

      if (!$scope.bio) {
        $http.get('/scripts/data/biography.json', {})
          .then(({ data, status, statusText, xhrStatus }) => {
            $scope.bio = data;
            $scope.progress += 1;
          }, ({ data, status, statusText, xhrStatus }) => {
            console.warn(`Failed to retrieve 'bio' data. Reason: (${status}) ${statusText}`)
          });
      }

      if (!$scope.about) {
        $http.get('/scripts/data/about.json', {})
          .then(({ data, status, statusText, xhrStatus }) => {
            $scope.about = data;
            $scope.about_contents = [{ 'name': 'My Bio', 'id': 'bio' }];
            for (let x = 0; x < $scope.about.length; x++) {
              $scope.about_contents.push({ 'name': $scope.about[x].heading, 'id': `${$scope.about[x].id}` });
            };
            $scope.sections = $scope.about_contents.map((i) => i.id);
            $scope.progress += 1;
          }, ({ data, status, statusText, xhrStatus }) => {
            console.warn(`Failed to retrieve 'about' data. Reason: (${status}) ${statusText}`)
          });
      } else {
        $scope.sections = $scope.about_contents.map((i) => i.id);
      }

      $scope.$watch(
        () => $rootScope.facts,
        (newValue, oldValue) => {
          if (Array.isArray(newValue) && ($scope.facts.length != 5 || newValue != oldValue)) {
            $scope.facts = newValue.slice(5, 10);
          }
        }
      );
    };

    ngApp.controller('AboutCtrl', ['$scope', '$http', '$rootScope', aboutController]);
  });
