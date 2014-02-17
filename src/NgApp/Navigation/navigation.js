angular.module('app.navigation', ['ngRoute']);

angular.module('app.navigation')
    .controller('NavigationCtrl', ['$scope', '$location', NavigationCtrl]);

function NavigationCtrl($scope, $location) {
    $scope.title = 'Strappy';
    $scope.navItems = [
        { title: " Home",   route: "/",  icon: "fa fa-home" },
        { title: "About", route: "/about", icon: "" }
    ];

    $scope.isCollapsed = true;

    $scope.setRoute = function (route) {
        $location.path(route);
    };

    $scope.isActive = function(route) {
        return ($location.path() == route);
    };
}