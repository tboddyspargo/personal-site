define(['scripts/app'], (ngApp) => {
  function DataService($http) {
    /* @summary Handle successful $http.get call that returned the wrong file (index.html) due to firebase rewrite rules.
    */
    function handleJsonSuccess({ data, status, headers, config, statusText }) {
      if (`${data}`.startsWith('<!DOCTYPE html>')) {
        throw `HTTP GET request to '${config.url}' returned an html file. This is likely due to a URL rewrite. (${status}) ${statusText}.`;
      } else {
        return data;
      }
    }

    /* @summary use $http to get JSON file.
    */
    function getJson(path, options = {}) {
      return $http.get(path, options).then(handleJsonSuccess);
    }

    /* @summary Get facts data.
    */
    this.getFacts = function () {
      return getJson('/scripts/data/facts.json');
    };

    /* @summary Get intro data.
    */
    this.getIntro = function () {
      return getJson('/scripts/data/intro.json');
    };

    /* @summary Get biography data.
    */
    this.getBio = function () {
      return getJson('/scripts/data/biography.json');
    };

    /* @summary Get education data.
    */
    this.getEducation = function () {
      return getJson('/scripts/data/education.json');
    };

    /* @summary Get employment data.
    */
    this.getEmployment = function () {
      return getJson('/scripts/data/employment.json');
    };

    /* @summary Get projects data.
    */
    this.getProjects = function () {
      return getJson('/scripts/data/projects.json');
    };
  };
  ngApp.service('DataService', ['$http', DataService]);
});
