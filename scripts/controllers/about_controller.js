require(['app'], 
	function(app) {
	app.controller('AboutCtrl', ['$scope','$http','$rootScope','sparkSetup', '$sce', '$timeout',
		function ($scope, $http, $rootScope, sparkSetup, $sce, $timeout) {
			sparkSetup.debug = true;
			sparkSetup.enableInvalidationInterval();
			$scope.progress = 1;
			$scope.total_progress = 6;
			var x = 0;
			$scope.sidebar = {heading: 'Contents',
									text:'',
									contents:[]};
			$scope.main_facts = $rootScope.main_facts || [];
			$scope.facts = $rootScope.facts || [];

			if (!$rootScope.about) {
			$http.get('/scripts/data/about.json', {})
				.success(function(data) {
					$scope.about = data;
				 	$rootScope.about = $scope.about;
					$scope.progress +=1;
				 });
			}
			else {$scope.about = $rootScope.about;
						$scope.progress +=1;}

			if (!$rootScope.about_contents) {
			 	for (var x = 0; x < $scope.projects.length; x++) {
			 		$scope.sidebar.contents.push({'name':$scope.about[y].heading,'loc':$scope.about[y].id});
				}
				$rootScope.about_contents = $scope.sidebar.contents;
			}
			else {$scope.sidebar.contents = $rootScope.about_contents}

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

			if (!$rootScope.bio) {
			$http.get('/scripts/data/biography.json', {})
				.success(function(data) {
					$scope.bio = data;
					$scope.progress +=1;
				});
			}
			else {$scope.bio = $rootScope.bio;
						$scope.progress +=1;}

	}]);
});