(function () {
    var app = angular.module('app', [
        'app.authentication',
        'app.navigation',
        'app.demo',
        'app.home',
        'app.about',
        'ui.bootstrap',
        'ngRoute'
    ]);

    app.run(['$window', '$rootScope', function ($window, $rootScope) {
        if ($window.location.port != '') {
            $rootScope.isDemo = true;
        }
    }]);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/' });
    }]);

    app.run(['$rootScope', '$route', '$interval', 'authService',
        function ($rootScope, $route, $interval, authService) {
            
            var timeout = 1200000;
            var stopTime = $interval(logout, timeout);
            function logout() {
                authService.logout(true);
            }
            
            $rootScope.$on('event:auth-loginConfirmed', function () {
                $interval.cancel(stopTime);
                stopTime = $interval(logout, timeout);
            });
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if (!authService.isAuthenticated()) {
                    authService.validate();
                }
            });
            $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
                if (next && next.$$route && authService.isAuthenticated()) {
                    authService.validate();
                    $rootScope.appTitle = next.$$route.title;
                }
            });
            $route.reload();
        }]);

    app.run(function ($http) {
        $http.defaults.headers.post = { 'Content-Type': 'application/json' };
        $http.defaults.headers.put = { 'Content-Type': 'application/json' };
    });

    app.run(function (authService) {
        authService.validate();
    });
})();