define(['scripts/app'], (ngApp) => {
  function projectController($sce, $timeout, DataService) {
    const ctrl = this;
    ctrl.sections = [];

    DataService.getProjects()
      .then((data) => {
        $timeout(() => {
          ctrl.projects = data;
          for (let x = 0; x < data.length; x++) {
            ctrl.sections.push({ id: `project${x}`, name: data[x].name });
          }
          ctrl.projectsReady = true;
        });
      });
  };

  ngApp.controller('ProjectsCtrl', ['$sce', '$timeout', 'DataService', projectController]);
});
