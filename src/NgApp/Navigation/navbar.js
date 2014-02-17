(function () {
    'use strict';

    var controllerId = 'NavbarCtrl';

    angular.module('app').controller(controllerId,
        ['$scope', '$location', NavbarCtrl]);

    function NavbarCtrl($scope, $location) {
        $scope.title = 'Strappy';
        $scope.navItems = [
            { title: " Home",   route: "/",  icon: "fa fa-home" },
            { title: "About", route: "/about", icon: "" }
        ];

        $scope.isCollapsed = true;

        $scope.activate = activate;

        $scope.setRoute = function (route) {
            $location.path(route);
        };

        $scope.isActive = function(route) {
            return ($location.path() == route);
        };

        function activate() {
        }
    }
})();