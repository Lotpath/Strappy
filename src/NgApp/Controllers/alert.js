﻿(function () {
    'use strict';

    var controllerId = 'AlertCtrl';

    angular.module('app').controller(controllerId,
        ['$scope', AlertCtrl]);

    function AlertCtrl($scope) {
        $scope.title = 'AlertCtrl';
        $scope.activate = activate;

        $scope.alerts = [
            { type: 'success', message: 'Well done! You successfully set up this project.' },
            { type: 'danger', message: 'Guess what... This is only the beginning!' },
            { type: 'info', message: 'Strappy uses <a href="http://angularjs.org" target="_blank">AngularJS</a>, <a href="http://getbootstrap.com/" target="_blank">Bootstrap</a>, <a href="http://angular-ui.github.io/bootstrap/" target="_blank">Angular UI Bootstrap</a>, and <a href="http://fontawesome.io/" target="_blank">FontAwesome</a>.  Visit these sites to see what else you can do!' }
        ];

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        function activate() {
        }
    }
})();