"use strict";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
