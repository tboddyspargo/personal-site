import { module } from "angular";

import ResumeSectionComponent from "./resume-section";
import ResumeListEntryComponent from "./resume-list-entry";

export default module("tbs.resume", ["tbs.core", "tbs.layout"])
  .component(ResumeSectionComponent.selector, ResumeSectionComponent)
  .component(ResumeListEntryComponent.selector, ResumeListEntryComponent);
