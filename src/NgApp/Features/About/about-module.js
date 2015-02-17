(function() {
    angular.module('app.about', ['ngSanitize', 'ngRoute']);

    angular.module('app.about').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/about', {
                templateUrl: 'NgApp/Features/About/about.html',
                controller: 'AboutCtrl'
            });
         }]);
})();