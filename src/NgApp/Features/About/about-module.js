(function() {
    angular.module('app.about', ['ngSanitize']);

    angular.module('app.about').config(['$routeProvider', function ($routeProvider) {
             $routeProvider
                 .when('/about', {
                     templateUrl: 'NgApp/Features/About/about.html',
                     controller: 'AboutCtrl'
                 })
                 .otherwise({
                     redirectTo: '/'
                 });
         }]);
})();