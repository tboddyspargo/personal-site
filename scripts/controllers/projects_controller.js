require(['app'], 
	function(app) {
	app.controller('ProjectsCtrl', ['$scope','$http','$rootScope', '$sce', '$timeout',
		function ($scope, $http, $rootScope, $sce, $timeout) {
			$scope.progress = 1;
			$scope.total_progress = 5;
			var x = 0;
			$scope.sidebar = {heading: 'Contents',
									text:'',
									contents:[]};
			$scope.main_facts = $rootScope.main_facts || [];
			$scope.facts = $rootScope.facts || [];

			if (!$rootScope.projects) {
			$http.get('/scripts/data/projects.json', {})
				.success(function(data) {
					$scope.projects = data;
				 	$rootScope.projects = $scope.projects;
					$scope.progress +=1;
				});
			}
			else {$scope.projects = $rootScope.projects;
						$scope.progress +=1;}

			if (!$rootScope.projects_contents) {
			 	for (var x = 0; x < $scope.projects.length; x++) {
			 		$scope.sidebar.contents.push({'name':$scope.projects[x].name,'loc':'project'+x});
				}
				$rootScope.projects_contents = $scope.sidebar.contents;
			}
			else {$scope.sidebar.contents = $rootScope.projects_contents}

			if (!$rootScope.facts || !$rootScope.main_facts) {
			$http.get('/scripts/data/facts.json', {})
				.success(function(data) {
				 	var newFacts = data.slice(0), num;
				 	for (x = 0; x < 5; x ++) {
				 		num = Math.floor(Math.random()*newFacts.length);
				 		$scope.main_facts = $scope.main_facts.concat(newFacts.splice(num,1));
				 	}
				 	$rootScope.main_facts = $scope.main_facts;
				 	for (x = 0; x < 5; x ++) {
				 		num = Math.floor(Math.random()*newFacts.length);
				 		$scope.facts = $scope.facts.concat(newFacts.splice(num,1));
				 	}
				 	$rootScope.facts = $scope.facts;
					$scope.progress +=1;
				 });
			}
			else {$scope.facts = $rootScope.facts;
				 	$scope.main_facts = $rootScope.main_facts;
					$scope.progress +=1;}


			if (!$rootScope.links) {
				$http.get('/scripts/data/links.json', {})
					.success(function(data) {
						$scope.links = data;
				 		$rootScope.links = $scope.links;
						$scope.progress +=1;
					});
			}
			else {$scope.links = $rootScope.links;
					$scope.progress +=1;}

			if (!$rootScope.blogs) {
				$http.get('/scripts/data/blogs.json', {})
					.success(function(data) {
						$scope.blogs = data;
				 		$rootScope.blogs = $scope.blogs;
						$scope.progress +=1;
					});
				}
			else {$scope.blogs = $rootScope.blogs;
						$scope.progress +=1;}

	}]);
});