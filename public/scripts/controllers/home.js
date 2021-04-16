define(['scripts/app', 'utils/helpers'],
  (ngApp, Utils) => {
    function homeController($scope, $sce, DataService, $timeout) {
      $scope.name = 'home';
      $scope.progress = 0;
      $scope.total_progress = 4;
      $scope.short_desc = [];

      const proj = DataService.getProjects()
        .then((data) => {
          $timeout(() => {
            for (let x = 0; x < data.length; x++) {
              $scope.short_desc.push({ name: data[x].name, desc: data[x].goal, thumbnail: data[x].thumbnail, label: 'Project', page: 3, pageLoc: "/projects", loc: `#project${x}` });
            }
            $scope.progress += 1;
          });
        });

      const edu = DataService.getEducation()
        .then((data) => {
          $timeout(() => {
            for (const entry of data.entries) {
              $scope.short_desc.push({ name: `${entry.title} (${entry.organization.name})`, desc: entry.description, thumbnail: entry.thumbnail, label: 'School', pageLoc: "/about", loc: '#education' });

            }
            $scope.progress += 1;
          });
        });

      const emp = DataService.getEmployment()
        .then((data) => {
          $timeout(() => {
            for (const entry of data.entries) {
              $scope.short_desc.push({ name: entry.title, desc: entry.highlights[0], thumbnail: entry.thumbnail, label: 'Job', pageLoc: "/about", loc: '#employment' });
            }
            $scope.progress += 1;
          });
        });

      Promise.all([proj, edu, emp]).then((data) => {
        $timeout(() => {
          $scope.short_desc = Utils.shuffleArray($scope.short_desc);
        });
      });

      DataService.getIntro()
        .then((data) => {
          $timeout(() => {
            $scope.intro = data;
            $scope.progress += 1;
          });
        });
    };

    ngApp.controller('HomeCtrl', ['$scope', '$sce', 'DataService', '$timeout', homeController]);
  });
