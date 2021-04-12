define(['scripts/app', 'utils/scroll', 'utils/helpers'],
  (ngApp, scroll) => {
    function aboutController($scope, $http, $rootScope, $sce, $timeout) {
      $scope.name = 'about';
      $scope.sections = [];
      $scope.this_progress = $scope.this_progress || 1;
      $rootScope.progress = $scope.this_progress;
      $rootScope.total_progress = 3;
      $scope.facts = [];
      let x = 0;

      if (!$scope.bio) {
        $http.get('/scripts/data/biography.json', {})
          .success(function (data) {
            $scope.bio = data;
            $scope.this_progress += 1; $rootScope.progress = $scope.this_progress;
          });
      }

      if (!$scope.about) {
        $http.get('/scripts/data/about.json', {})
          .success(function (data) {
            $scope.about = data;
            $scope.about_contents = [{ 'name': 'My Bio', 'id': 'bio' }];
            for (var x = 0; x < $scope.about.length; x++) {
              $scope.about_contents.push({ 'name': $scope.about[x].heading, 'id': `${$scope.about[x].id}` });
            };
            $scope.sections = $scope.about_contents.map((i) => i.id);
            $scope.this_progress += 1; $rootScope.progress = $scope.this_progress;
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
      )


    };

    ngApp.controller('AboutCtrl', ['$scope', '$http', '$rootScope', aboutController]);
  });
