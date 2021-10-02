import { module } from "angular";
export default class AboutController {
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
module("tyler-site").controller("AboutCtrl", AboutController);
