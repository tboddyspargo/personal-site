import { module } from "angular";

import HomeComponent from "./home";
import AboutComponent from "./about";
import ProjectsComponent from "./projects";

export default module("tbs.pages", ["tbs.core", "tbs.layout", "tbs.resume"])
  .component(HomeComponent.selector, HomeComponent)
  .component(ProjectsComponent.selector, ProjectsComponent)
  .component(AboutComponent.selector, AboutComponent);
