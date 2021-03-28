define(['angularAMD', 'utils/helpers'], (angularAMD) => {
    function globalController($sce, $rootScope, $http, $document) {
        $rootScope.showViewer = false;
        $rootScope.sidebar = {
            heading: 'Contents',
            contents: []
        };
        if (!$rootScope.links) {
            $http.get('/scripts/data/links.json', {})
                .success(function (data) {
                    $rootScope.links = data;
                });
        }
        if (!$rootScope.blogs) {
            $http.get('/scripts/data/blogs.json', {})
                .success(function (data) {
                    $rootScope.blogs = data;
                });
        }

        if (!$rootScope.facts) {
            $http.get('/scripts/data/facts.json', {})
                .success(function (data) {
                    var facts = shuffleArray(data);
                    $rootScope.facts = facts;
                    $rootScope.side_facts = $rootScope.facts.slice(0, 5);
                });
        }

        $rootScope.makeActive = function (index) {
            $rootScope.active = index;
        };

        $rootScope.displayViewer = function (images) {
            if (images) { $rootScope.images = images; }
            $rootScope.showViewer = true;
            angular.element(document).find('body').addClass('noscroll');
        };

        $rootScope.hideViewer = function () {
            $rootScope.showViewer = false;
            angular.element(document).find('body').removeClass('noscroll');
            $rootScope.showViewer = false;
        };

        $rootScope.isActive = function (index) {
            return $rootScope.active === index;
        };

        $rootScope.deliberatelyTrustDangerousSnippet = function (item) {
            return $sce.trustAsHtml(item);
        };

    };

    globalController.$inject = ['$sce', '$rootScope', '$http', '$document'];

    return globalController;
});