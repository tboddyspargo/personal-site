export function routeConfig($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: require('./templates/home.html'),
      controller: 'HomeCtrl',
      controllerAs: '$ctrl',
      activeTab: 'home',
      reloadOnSearch: false
    })
    .when('/about', {
      templateUrl: require('./templates/about.html'),
      controller: 'AboutCtrl',
      controllerAs: '$ctrl',
      activeTab: 'about',
      reloadOnSearch: false
    })
    .when('/projects', {
      templateUrl: require('./templates/projects.html'),
      controller: 'ProjectsCtrl',
      controllerAs: '$ctrl',
      activeTab: 'projects',
      reloadOnSearch: false
    })
    .otherwise({
      redirectTo: '/',
    });

  $locationProvider.html5Mode(true).hashPrefix('#');
};

export function routeChangeHandler($rootScope, $location, $anchorScroll, $timeout) {
  $anchorScroll.yOffset = 60; // always scroll by 50 extra pixels

  let previousAnchor = '';
  $rootScope.scrollTo = (anchor = $location.hash(), delay = 0, trigger = 'unknown') => {
    $timeout(() => {
      if (anchor != previousAnchor) {
        $anchorScroll(anchor);
        previousAnchor = anchor;
      }
    }, delay, false);
  };

  function locationChangeHandler(event) {
    const currentHash = $location.hash();
    $rootScope.scrollTo(currentHash, 200, event.name);
  }

  $rootScope.$on('$viewContentLoaded', locationChangeHandler);

}
