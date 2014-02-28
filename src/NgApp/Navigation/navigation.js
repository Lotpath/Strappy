angular.module('app.navigation', ['app.authentication', 'ngRoute']);

angular.module('app.navigation')
    .controller('NavigationCtrl', ['$scope', '$location', 'authService', NavigationCtrl]);

function NavigationCtrl($scope, $location, auth) {
    $scope.title = 'Strappy';
    $scope.navItems = [
        { title: " Home",   route: "/",  icon: "fa fa-home" },
        { title: "About", route: "/about", icon: "" }
    ];

    $scope.isCollapsed = true;
    $scope.$on('event:auth-loginConfirmed', function () {
        $scope.username = auth.getUsername();
    });

    $scope.setRoute = function (route) {
        $location.path(route);
        $scope.isCollapsed = true;
    };

    $scope.isActive = function(route) {
        return ($location.path() == route);
    };
    
    $scope.logout = function () {
        auth.logout();
    };
    
    $scope.manageUserAccount = function () {
        // stub -- call setRoute()
    };

    $scope.changeUserPassword = function () {
        // stub
    };

    $scope.simulateTimeout = function() {
        auth.simulateTimeout();
    };
}