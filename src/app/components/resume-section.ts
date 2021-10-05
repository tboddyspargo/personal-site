import { module } from "angular";
class ResumeSectionController {
  imagesVisible = true;

  toggleImageVisibility = () => {
    this.imagesVisible = !this.imagesVisible;
  };
}
export default class ResumeSectionComponent {
  bindings = {
    title: "@",
    intro: "@",
    entries: "<",
    images: "<",
    footer: "<",
  };
  templateUrl = require("./resume-section.html");
  controller = ResumeSectionController;
}
module("tyler-site").component("tbsResumeSection", new ResumeSectionComponent());
