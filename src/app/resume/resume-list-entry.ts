"use strict";
console.debug("Loading resume-list-entry component...");

class ResumeListEntryController {}

const ResumeListEntryComponent = {
  selector: "tbsResumeEntry",
  bindings: {
    entry: "<",
  },
  templateUrl: require("./resume-list-entry.html"),
  controller: ResumeListEntryController,
};

export default ResumeListEntryComponent;
