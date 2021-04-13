define(['scripts/app', 'utils/helpers'], (ngApp, Utils) => {
  function FactService($http) {
    // The FactService public return object;
    const Facts = {
      name: "FactService",
      facts: [],
      // < 1 means incomplete; >= 1 means complete;
      progress: 0,
    };

    /* @summary Populate the facts data object and update progress.
    */
    function getFacts() {
      $http.get('/scripts/data/facts.json', {})
        .then(({ data, status, statusText, xhrStatus }) => {
          Facts.facts = data;
          Facts.shuffleFacts();
        }, ({ data, status, statusText, xhrStatus }) => {
          console.warn(`Failed to retrieve 'facts' data. Reason: (${status}) ${statusText}`)
        })
        .finally(() => {
          Facts.progress = 1;
        });
    };
    /* @summary Shuffle the facts array.
    */
    Facts.shuffleFacts = function () {
      this.facts = Utils.shuffleArray(this.facts);
    };


    // Initialize and return service interface.
    (function init() {
      getFacts();
    })();
    return Facts;
  };
  ngApp.factory('FactService', ['$http', FactService]);
});
