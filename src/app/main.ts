"use strict";
import { module } from "angular";
import "angular-route";
import "angular-sanitize";

import { routeConfig, routeChangeHandler } from "./routes";
import core from "./core";
import layout from "./layout";
import pages from "./pages";
import resume from "./resume";

// Additional functionality is provided in feature-specific angular modules.
const AppDependencies = ["ngSanitize", "ngRoute", core.name, layout.name, resume.name, pages.name];

// Initialize app with route config and route change handling.
console.debug("Loading tyler-site module...");
export default module("tbs", AppDependencies).config(routeConfig).run(routeChangeHandler);
