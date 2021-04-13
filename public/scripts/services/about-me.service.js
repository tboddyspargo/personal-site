define(['scripts/app', 'utils/helpers'], (ngApp, Utils) => {
  function AboutMeService($http) {
    // make sure "this" is referenceable from private functions.
    const AboutMe = this;

    // Total number of data elements to be retrieved.
    //   Progress will increment by this number's inverse for each item loaded.
    //   This means that progress will equal 1 when all data is loaded.
    const total_requests = 4,
      progress_increment = 1 / total_requests;
    let progress = 0;
    AboutMe.ready = () => (progress || 0) >= 1;

    // The FactService public properties
    AboutMe.name = "AboutMeService";
    AboutMe.facts = [];
    AboutMe.intro = "";
    AboutMe.bio = [];
    AboutMe.education = {};
    AboutMe.employment = {};
    AboutMe.resumeSections = [];

    // Initialize the data
    getIntro();
    getBio();
    getEducation();
    getEmployment();

    /* @summary Populate the intro data object and update progress.
    */
    function getIntro() {
      $http.get('/scripts/data/intro.json', {})
        .then(({ data, status, statusText, xhrStatus }) => {
          AboutMe.intro = data;
        }, ({ data, status, statusText, xhrStatus }) => {
          console.warn(`Failed to retrieve 'intro' data. Reason: (${status}) ${statusText}`)
        })
        .finally(() => {
          progress += progress_increment;
        });
    };

    /* @summary Populate the bio data object and update progress.
    */
    function getBio() {
      $http.get('/scripts/data/biography.json', {})
        .then(({ data, status, statusText, xhrStatus }) => {
          AboutMe.bio = `${data}`.split('\n');
        }, ({ data, status, statusText, xhrStatus }) => {
          console.warn(`Failed to retrieve 'bio' data. Reason: (${status}) ${statusText}`)
        })
        .finally(() => {
          progress += progress_increment;
        });
    };

    /* @summary Populate the education data object and update progress.
    */
    function getEducation() {
      $http.get('/scripts/data/education.json', {})
        .then(({ data, status, statusText, xhrStatus }) => {
          AboutMe.education = data;
          AboutMe.resumeSections.push(data);
        }, ({ data, status, statusText, xhrStatus }) => {
          console.warn(`Failed to retrieve 'education' data. Reason: (${status}) ${statusText}`)
        })
        .finally(() => {
          progress += progress_increment;
        });
    };

    /* @summary Populate the education data object and update progress.
    */
    function getEmployment() {
      $http.get('/scripts/data/employment.json', {})
        .then(({ data, status, statusText, xhrStatus }) => {
          Object.assign(AboutMe.employment, data);
          AboutMe.resumeSections.push(data);
        }, ({ data, status, statusText, xhrStatus }) => {
          console.warn(`Failed to retrieve 'employment' data. Reason: (${status}) ${statusText}`)
        })
        .finally(() => {
          progress += progress_increment;
        });
    };
  };
  ngApp.service('AboutMeService', ['$http', AboutMeService]);
});
