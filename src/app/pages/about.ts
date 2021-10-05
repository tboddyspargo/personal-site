"use strict";
console.debug("Loading about controller...");

export class AboutController {
  sections = [
    { id: "bio", name: "Biography" },
    { id: "education", name: "Education" },
    { id: "employment", name: "Employment" },
  ];
  bio;
  bioReady = false;
  facts;
  factsReady = false;
  education;
  educationReady = false;
  employment;
  employmentReady = false;

  static get $inject() {
    return ["DataService", "$timeout", "UtilityService"];
  }
  constructor(private DataService, private $timeout, private UtilityService) {
    DataService.getBio().then((data) => {
      $timeout(() => {
        this.bio = data.split("\n");
        this.bioReady = true;
      });
    });

    DataService.getFacts().then((data) => {
      $timeout(() => {
        this.facts = UtilityService.shuffleArray(data);
        this.factsReady = true;
      });
    });

    const eduPromise = DataService.getEducation().then((data) => {
      $timeout(() => {
        this.education = data;
        this.educationReady = true;
      });
    });

    const empPromise = DataService.getEmployment().then((data) => {
      $timeout(() => {
        this.employment = data;
        this.employmentReady = true;
      });
    });
  }
}

const AboutComponent = {
  selector: "tbsAboutPage",
  controller: AboutController,
  templateUrl: require("./about.html"),
};

export default AboutComponent;
