import { module } from "angular";
class ResumeSectionController {
  images = [];
  activeImage = 0;
  _showImages = true;

  showImages() {
    this._showImages;
  }
  toggleImages() {
    this._showImages = !this._showImages;
  }
  hasImages() {
    this.images && Array.isArray(this.images) && !!this.images.length;
  }
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
