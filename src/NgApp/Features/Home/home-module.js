(function() {
    angular.module('app.home', ['ngSanitize']);

    angular.module('app.home').config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'NgApp/Features/Home/home.html',
                    controller: 'HomeCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }]);
})();