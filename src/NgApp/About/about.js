angular.module('app.about', []);

angular.module('app.about')
    .controller('AboutCtrl', ['$scope', AboutCtrl]);

    function AboutCtrl($scope) {
        $scope.title = 'About Strappy';
    }