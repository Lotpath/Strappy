(function () {
    'use strict';

    var app = angular.module('app', [
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap'
    ]);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'NgApp/Home/home.html',
                controller: 'HomeCtrl'
            })
            .when('/about', {
                templateUrl: 'NgApp/About/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

    app.run(['$q', '$rootScope',
        function ($q, $rootScope) {
        }]);
})();