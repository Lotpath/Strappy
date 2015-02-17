(function() {
    angular.module('app.home', ['ngSanitize', 'ngRoute']);

    angular.module('app.home').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'NgApp/Features/Home/home.html',
                controller: 'HomeCtrl'
            });
        }]);
})();