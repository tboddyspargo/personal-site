require(['app', 'helpers'], 
	function(app) {
	app.controller('HomeCtrl', ['$scope','$http','$rootScope', '$sce', '$timeout',
		function ($scope, $http, $rootScope, $sce, $timeout) {
			$rootScope.active=1;
			$scope.progress = 1;
			$scope.total_progress = 7;
			var x = 0;

			
			$scope.short_desc = $rootScope.short_desc || [];
			$scope.main_facts = $rootScope.main_facts || [];
			$scope.side_facts = $rootScope.side_facts || [];
			
			if (!$rootScope.projects) {
				$rootScope.about_contents = [];
				$rootScope.projects_contents = [];
			$http.get('/scripts/data/projects.json', {})
				.success(function(data) {
					$scope.projects = data;
					for (x = 0; x < $scope.projects.length; x++) {
				 		$scope.short_desc.push({name:$scope.projects[x].name, desc:$scope.projects[x].goal, thumbnail:$scope.projects[x].thumbnail, label:'Project', page:3, pageLoc:"/projects", loc:'project'+x});
						$rootScope.projects_contents.push({'name':$scope.projects[x].name,'loc':'project'+x});
					}
					$rootScope.projects = $scope.projects;
					$rootScope.short_desc = $scope.short_desc;
					$scope.progress +=1;
				});
			}
			else {$scope.projects = $rootScope.projects;
						$scope.progress +=1;}
			
			if (!$rootScope.about) {
				$rootScope.about_contents.push({'name':'Biography','loc':'bio'});
				$http.get('/scripts/data/about.json', {})
					.success(function(data) {
						$scope.about = data;
						for (var y = 0; y < $scope.about.length; y++) {
							for (x = 0; x < $scope.about[y].entries.length; x++) {
						 		if ($scope.about[y].heading === 'Education') {
						 			$scope.short_desc.push({name: $scope.about[y].entries[x].name, desc: $scope.about[y].entries[x].description.slice(0,70)+"...", thumbnail: $scope.about[y].entries[x].thumbnail, label: 'School', page:2, pageLoc:"/about", loc: $scope.about[y].id});}
						 		if ($scope.about[y].heading === 'Employment History') {
						 			$scope.short_desc.push({name:$scope.about[y].entries[x].name, desc:$scope.about[y].entries[x].list[0]+"...", thumbnail:$scope.about[y].entries[x].thumbnail, label:'Job', page:2, pageLoc:"/about", loc:$scope.about[y].id});}
						 	}
						 	$scope.short_desc = shuffleArray($scope.short_desc);
						 	$rootScope.about_contents.push({'name':$scope.about[y].heading,'loc':$scope.about[y].id});
						}
					 	$rootScope.about = $scope.about;
						$scope.progress +=1;
					 });
			}
			else {$scope.about = $rootScope.about;
						$scope.progress +=1;}


			if (!$rootScope.blurb) {
			$http.get('/scripts/data/blurb.json', {})
				.success(function(data) {
					$scope.blurb = data;
				 	$rootScope.blurb = $scope.blurb;
					$scope.progress +=1;
				});
			}
			else {$scope.blurb = $rootScope.blurb;
						$scope.progress +=1;}

			if (!$rootScope.facts) {
				$http.get('/scripts/data/facts.json', {})
					.success(function(data) {
					 	var facts = shuffleArray(data);
			 			$rootScope.facts = facts;
					 	$scope.side_facts = $rootScope.facts.slice(5,10);
						$scope.progress +=1;
					 });
			}
			else {$rootScope.facts = shuffleArray($rootScope.facts);
			 	$scope.side_facts = $rootScope.facts.slice(5,10);
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