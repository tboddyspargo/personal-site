define(['angular'],
		function(angular) {
	angular.module('application.dataService',[])
		.service('dataService', function ($http) {
			var short_desc = []

			$http.get('/data/projects.json', {})
				.success(function(data) {
					for (var x = 0; x < data.length; x++) {
				 		short_desc.push({name:data[x].name, desc:data[x].goal, thumbnail:data[x].thumbnail, label:'Project', page:3, loc:'project'+x});
					}
				});
			


		});
});