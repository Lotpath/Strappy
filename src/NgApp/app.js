var app = angular.module('app', [
    'app.authentication',
    'app.navigation',
    'app.home',
    'app.about',
    'ui.bootstrap'
]);

app.run(['$q', '$rootScope',
    function ($q, $rootScope) {
    }
]);
