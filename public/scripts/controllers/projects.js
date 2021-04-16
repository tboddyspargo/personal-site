define(['scripts/app'],
  (ngApp) => {
    function projectController($q, $sce, $timeout, DataService) {
      const ctrl = this;
      ctrl.sections = [];
      ctrl.progress = 0;
      ctrl.total_progress = 1;

      $q.when(DataService.getProjects())
        .then((data) => {
          ctrl.projects = data;
          for (let x = 0; x < data.length; x++) {
            ctrl.sections.push({ id: `project${x}`, name: data[x].name });
          }
          ctrl.progress += 1;
          ctrl.projectsReady = true;
        });

    };

    ngApp.controller('ProjectsCtrl', ['$q', '$sce', '$timeout', 'DataService', projectController]);
  });
