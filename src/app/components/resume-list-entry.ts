import { module } from "angular";

class ResumeListEntryController {}

export default class ResumeListEntryComponent {
  bindings = {
    entry: "<",
  };
  templateUrl = require("./resume-list-entry.html");
  controller = ResumeListEntryController;
}
module("tyler-site").component("tbsResumeListEntry", new ResumeListEntryComponent());
