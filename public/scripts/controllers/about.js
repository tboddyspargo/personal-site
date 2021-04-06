define(['scripts/app', 'utils/scroll', 'utils/helpers'], function(ngApp, scroll) {
	function aboutController($scope, $http, $rootScope, $sce, $timeout) {
		$rootScope.active = 2;
		$scope.this_progress = $scope.this_progress || 1;
		$rootScope.progress = $scope.this_progress;
		$rootScope.total_progress = 3;
		var x = 0;


		if (!$scope.bio) {
			$http.get('/scripts/data/biography.json', {})
				.success(function(data) {
					$scope.bio = data;
					$scope.this_progress += 1; $rootScope.progress = $scope.this_progress;
				});
		}

		if (!$scope.about) {
			$http.get('/scripts/data/about.json', {})
				.success(function(data) {
					$scope.about = data;
					$scope.about_contents = [{'name':'My Bio', 'id':'bio'}];
					for (var x = 0; x < $scope.about.length; x++) {
						$scope.about_contents.push({'name':$scope.about[x].heading,'id':`${$scope.about[x].id}`});
					};
					$rootScope.sections = $scope.about_contents.map((i) => { return `#${i.id}`; });
					$scope.this_progress += 1; $rootScope.progress = $scope.this_progress;
				});
		} else {
			$rootScope.sections = $scope.about_contents.map((i) => { return `#${i.id}`; });
		}

		if ($rootScope.facts) {
			$rootScope.facts = shuffleArray($rootScope.facts);
			$rootScope.side_facts = $rootScope.facts.slice(0,5);
			$scope.main_facts = $rootScope.facts.slice(5,10);
		}


	};

	ngApp.controller('AboutCtrl', ['$scope','$http','$rootScope', aboutController]);
});