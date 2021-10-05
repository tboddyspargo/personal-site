"use strict";
console.debug("Loading projects component...");

export class ProjectsController {
  sections = [];
  projects;
  projectsReady = false;
  currentImages = [];

  static get $inject() {
    return ["$sce", "$timeout", "DataService"];
  }
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

const ProjectsComponent = {
  selector: "tbsProjectsPage",
  controller: ProjectsController,
  templateUrl: require("./projects.html"),
};

export default ProjectsComponent;
