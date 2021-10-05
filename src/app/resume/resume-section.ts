"use strict";
console.debug("Loading resume-section component...");

class ResumeSectionController {
  imagesVisible = true;

  toggleImageVisibility = () => {
    this.imagesVisible = !this.imagesVisible;
  };
}
const ResumeSectionComponent = {
  selector: "tbsResumeSection",
  bindings: {
    title: "@",
    intro: "@",
    entries: "<",
    images: "<",
    footer: "<",
  },
  templateUrl: require("./resume-section.html"),
  controller: ResumeSectionController,
};

export default ResumeSectionComponent;
