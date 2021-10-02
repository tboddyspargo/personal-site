import { module } from 'angular';
export default class DataService {
  private $http: any;

  static get $inject() { return ["$http"]; }

  constructor($http: any) {
    this.$http = $http
  }
  /* @summary Handle successful $http.get call that returned the wrong file (index.html) due to firebase hosting rewrite rules.
  */
  handleJsonSuccess({ data, status, headers, config, statusText }) {
    if (`${data}`.startsWith('<!DOCTYPE html>')) {
      throw `HTTP GET request to '${config.url}' returned an html file. This is likely due to a URL rewrite. (${status}) ${statusText}.`;
    } else {
      return data;
    }
  }

  /* @summary use $http to get JSON file.
  */
  getJson(path: string, options = {}) {
    return this.$http.get(path, options).then(this.handleJsonSuccess);
  }

  /* @summary Get facts data.
  */
  getFacts() {
    return this.getJson('/data/facts.json');
  };

  /* @summary Get intro data.
  */
  getIntro() {
    return this.getJson('/data/intro.json');
  };

  /* @summary Get biography data.
  */
  getBio() {
    return this.getJson('/data/biography.json');
  };

  /* @summary Get education data.
  */
  getEducation() {
    return this.getJson('/data/education.json');
  };

  /* @summary Get employment data.
  */
  getEmployment() {
    return this.getJson('/data/employment.json');
  };

  /* @summary Get projects data.
  */
  getProjects() {
    return this.getJson('/data/projects.json');
  };
};

module('tyler-site').service('DataService', DataService);
