(function () {
    'use strict';

    var controllerId = 'AboutCtrl';

    angular.module('app').controller(controllerId,
        ['$scope', AboutCtrl]);

    function AboutCtrl($scope) {
        $scope.title = 'About Strappy';
        $scope.activate = activate;

        function activate() {
        }
    }
})();