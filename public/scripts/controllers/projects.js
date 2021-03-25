define(['utils/helpers'], function() {
	function projectController($scope, $http, $rootScope, $sce, $timeout) {
		$rootScope.active = 3;
		$rootScope.sidebar.contents = [];
		$scope.this_progress = $scope.this_progress || 1;
		$rootScope.progress = $scope.this_progress;
		$rootScope.total_progress = 2;
		var x = 0;


		if (!$scope.projects) {
			$http.get('/scripts/data/projects.json', {})
				.success(function(data) {
					$scope.projects = data;
					$scope.projects_contents = [];
					for (var x = 0; x < $scope.projects.length; x++) {
						$rootScope.images = $scope.projects[x].images;
						$scope.projects_contents.push({'name':$scope.projects[x].name,'loc':'project'+x});
					}; $rootScope.sidebar.contents = $scope.projects_contents;
					$scope.this_progress += 1; $rootScope.progress = $scope.this_progress;
				});
		}
		else {$rootScope.sidebar.contents = $scope.projects_contents;}

		if ($rootScope.facts) {
			$rootScope.facts = shuffleArray($rootScope.facts);
			$rootScope.side_facts = $rootScope.facts.slice(0,5);
		}

	};

	projectController.$inject = ['$scope','$http','$rootScope'];

	return projectController;
});