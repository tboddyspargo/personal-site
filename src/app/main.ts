"use strict";
import { module } from "angular";
import "angular-route";
import "angular-sanitize";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { routeConfig, routeChangeHandler } from "./routes";
import core from "./core";
import layout from "./layout";
import pages from "./pages";
import resume from "./resume";

// Initialize Firebase
// cspell: disable
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAUMLrpSEYcmbViqWscWyBSqdZV122CNy8",
  authDomain: "valued-cumulus-300017.firebaseapp.com",
  projectId: "valued-cumulus-300017",
  storageBucket: "valued-cumulus-300017.appspot.com",
  messagingSenderId: "927371268598",
  appId: "1:927371268598:web:7ba741d86a81b828e837d7",
  measurementId: "G-SEJV5SEFXB",
});
// cspell: enable
const analytics = getAnalytics();

// Additional functionality is provided in feature-specific angular modules.
const AppDependencies = ["ngSanitize", "ngRoute", core.name, layout.name, resume.name, pages.name];

// Initialize app with route config and route change handling.
console.debug("Loading tyler-site module...");
export default module("tbs", AppDependencies).config(routeConfig).run(routeChangeHandler);
