angular.module('app.about', ['app.authentication']);

angular.module('app.about')
    .controller('AboutCtrl', ['$scope', 'authService', AboutCtrl]);

    function AboutCtrl($scope, authService) {
        $scope.title = 'About Strappy';
        authService.validate();
    }
