var app = angular.module('app', [
    'app.authentication',
    'app.navigation',
    'app.home',
    'app.about',
    'ui.bootstrap',
    'ngRoute'
]);

app.run(['$route', '$q', '$rootScope',
    function ($route, $q, $rootScope) {
    }
]);
