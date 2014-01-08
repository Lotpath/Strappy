(function () {
    'use strict';

    var controllerId = 'HomeCtrl';

    angular.module('app').controller(controllerId,
        ['$scope', HomeCtrl]);

    function HomeCtrl($scope) {
        $scope.title = 'Welcome to Strappy!';
        $scope.activate = activate;

        function activate() {
        }
    }
})();