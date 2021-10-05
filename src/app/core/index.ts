import { module } from "angular";
import DataService from "./data";
import ProgressComponent from "./progress-bar";
import ScrollService from "./scroll";
import UtilityService from "./utility";

export default module("tbs.core", [])
  .service("ScrollService", ScrollService)
  .service("UtilityService", UtilityService)
  .service("DataService", DataService)
  .component(ProgressComponent.selector, ProgressComponent);
