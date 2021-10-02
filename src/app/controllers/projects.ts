import { module } from "angular";
export default class ProjectController {
  sections = [];
  projects;
  projectsReady = false;
  currentImages = [];

  constructor($sce, $timeout, DataService) {
    DataService.getProjects().then((data) => {
      $timeout(() => {
        this.projects = data;
        for (let x = 0; x < data.length; x++) {
          this.sections.push({ id: `project${x}`, name: data[x].name });
        }
        this.projectsReady = true;
      });
    });
  }
}
module("tyler-site").controller("ProjectsCtrl", ProjectController);
