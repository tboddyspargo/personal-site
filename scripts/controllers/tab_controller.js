require(['app'], 
	function(app) {
	app.controller('TabCtrl', ['$scope', '$location', '$anchorScroll', '$sce','$http','$rootScope','sparkSetup',
		function ($scope, $location, $anchorScroll, $sce, $http, $rootScope, sparkSetup) {
			sparkSetup.debug = true;
			sparkSetup.enableInvalidationInterval();

			var x = 0;
			$scope.right = 0;
			$scope.short_desc = [];
			$scope.projects = [];
			$scope.about = [];
			$rootScope.sidebar = {'1':{heading: 'Contents',
									text:'',
									contents:[]
										},
								'2':{heading: 'Contents',
									text:'',
									contents:[{name:'Bio', loc:'bio'}]
									},
								'3':{heading: 'Contents',
									text:'',
									contents:[]
									}};
			$scope.main_facts = [];
			$scope.links = [];
			$scope.blogs = [];
			$scope.facts = [];
			$scope.bio = '';
			$scope.blurb = '';

			$http.get('/scripts/data/projects.json', {})
				.success(function(data) {
					$scope.projects = data;
					for (var x = 0; x < $scope.projects.length; x++) {
				 		$scope.short_desc.push({name:$scope.projects[x].name, desc:$scope.projects[x].goal, thumbnail:$scope.projects[x].thumbnail, label:'Project', page:3, loc:'project'+x});
						$scope.sidebar['3'].contents.push({'name':$scope.projects[x].name,'loc':'project'+x});
					}
				});
			$http.get('/scripts/data/about.json', {})
				.success(function(data) {
					$scope.about = data;
					for (var y = 0; y < $scope.about.length; y++) {
						for (x = 0; x < $scope.about[y].entries.length; x++) {
					 		if ($scope.about[y].heading === 'Education') {
					 			$scope.short_desc.push({name: $scope.about[y].entries[x].name, desc: $scope.about[y].entries[x].description.slice(0,70)+"...", thumbnail: $scope.about[y].entries[x].thumbnail, label: 'School', page:2, loc: $scope.about[y].id});}
					 		if ($scope.about[y].heading === 'Employment History') {
					 			$scope.short_desc.push({name:$scope.about[y].entries[x].name, desc:$scope.about[y].entries[x].list[0]+"...", thumbnail:$scope.about[y].entries[x].thumbnail, label:'Job', page:2, loc:$scope.about[y].id});}
					 	}
					 	$scope.sidebar['2'].contents.push({'name':$scope.about[y].heading,'loc':$scope.about[y].id});
				 	}
				 });
			$http.get('/scripts/data/facts.json', {})
				.success(function(data) {
				 	var newFacts = data.slice(0), num;
				 	for (x = 0; x < 5; x ++) {
				 		num = Math.floor(Math.random()*newFacts.length);
				 		$scope.main_facts = $scope.main_facts.concat(newFacts.splice(num,1));
				 	}

				 	for (x = 0; x < 5; x ++) {
				 		num = Math.floor(Math.random()*newFacts.length);
				 		$scope.facts = $scope.facts.concat(newFacts.splice(num,1));
				 	}
				 });

			$http.get('/scripts/data/blurb.json', {})
				.success(function(data) {
					$scope.blurb = data;
				});
			$http.get('/scripts/data/biography.json', {})
				.success(function(data) {
					$scope.bio = data;
				});

			$http.get('/scripts/data/links.json', {})
				.success(function(data) {
					$scope.blogs = data;
				});

			$http.get('/scripts/data/blogs.json', {})
				.success(function(data) {
					$scope.links = data;
				});



			$scope.makeActive = function(index) {
				var string = '/';
				if (index === 1) {string = '/';}
				else if (index === 2) {string = '/';}
				else if (index === 3) {string = '/';}
				$location.path(string).hash('');
				$scope.active = index;
			};

			$scope.makeActive(1);

			$scope.isActive = function(index) {
				return $scope.active === index;
			};

			$scope.deliberatelyTrustDangerousSnippet = function(item) {
	           return $sce.trustAsHtml(item);
	         };

			$scope.toggleImages = function(index) {
				if (index) {
					$scope.projects[index].showImages = !$scope.projects[index].showImages;
				}
				else {
					$scope.education.showImages = !$scope.education.showImages;
				}
			};
			$scope.previousImage = function(thisObject) {
				if (!thisObject.activeImage) {
					thisObject.activeImage = thisObject.images.length-1;
				}
				else {thisObject.activeImage-=1;}
			};
			$scope.nextImage = function(thisObject) {
				thisObject.activeImage = (thisObject.activeImage+1)%thisObject.images.length;
			};
			$scope.goTo = function(loc) {
				$location.hash(loc);
				$anchorScroll();
			};
	}]);
});