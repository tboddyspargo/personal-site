"use strict";
console.debug("Loading home controller...");

export class HomeController {
  name: string = "home";
  progress: number = 0;
  total_progress: number = 4;
  short_desc: any = [];
  intro: string = "";

  static get $inject() {
    return ["$timeout", "DataService", "UtilityService"];
  }
  constructor($timeout, DataService, UtilityService) {
    DataService.getIntro().then((data) => {
      $timeout(() => {
        this.intro = data;
        this.progress += 1;
      });
    });

    const proj = DataService.getProjects().then((data) => {
      $timeout(() => {
        for (let x = 0; x < data.length; x++) {
          this.short_desc.push({
            name: data[x].name,
            desc: data[x].goal,
            thumbnail: data[x].thumbnail,
            label: "Project",
            pageLoc: "/projects",
            loc: `#project${x}`,
          });
        }
        this.progress += 1;
      });
    });

    const edu = DataService.getEducation().then((data) => {
      $timeout(() => {
        for (const entry of data.entries) {
          this.short_desc.push({
            name: `${entry.title} (${entry.organization.name})`,
            desc: entry.description,
            thumbnail: entry.thumbnail,
            label: "School",
            pageLoc: "/about",
            loc: "#education",
          });
        }
        this.progress += 1;
      });
    });

    const emp = DataService.getEmployment().then((data) => {
      $timeout(() => {
        for (const entry of data.entries) {
          this.short_desc.push({
            name: entry.title,
            desc: entry.highlights[0],
            thumbnail: entry.thumbnail,
            label: "Job",
            pageLoc: "/about",
            loc: "#employment",
          });
        }
        this.progress += 1;
      });
    });

    Promise.all([proj, edu, emp]).then((data) => {
      $timeout(() => {
        this.short_desc = UtilityService.shuffleArray(this.short_desc);
      });
    });
  }
}

const HomeComponent = {
  selector: "tbsHomePage",
  controller: HomeController,
  templateUrl: require("./home.html"),
};

export default HomeComponent;
