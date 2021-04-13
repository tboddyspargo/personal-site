define(['scripts/app', 'utils/helpers'],
  (ngApp, utils) => {
    function aboutController($scope, FactService, AboutMeService, $http, $rootScope) {
      $scope.name = 'about';

      // Info to determine if we're still loading data.
      const dataDependencies = [FactService.progress, AboutMeService.progress];
      $scope.progress ||= 0;
      $scope.ready = false;
      $scope.total_progress = dataDependencies.length - 1;

      // Prepare facts.
      $scope.FactService = FactService;
      FactService.shuffleFacts();
      $scope.AboutMeService = AboutMeService;

      // Prepare ToC.
      $scope.sections = [];
    };

    ngApp.controller('AboutCtrl', ['$scope', 'FactService', 'AboutMeService', '$http', '$rootScope', aboutController]);
  });
