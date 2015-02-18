(function() {
    angular.module('app.navigation').controller('NavigationCtrl', controller);
    controller.$inject = ['$scope', '$rootScope', '$location', 'authService'];

    function controller($scope, $rootScope, $location, auth) {
        $rootScope.appTitle = 'Strappy';
        $scope.navItems = [
            { title: " Home", route: "/", icon: "fa fa-home" },
            { title: "About", route: "/about", icon: "" }
        ];

        $scope.isCollapsed = true;
        $scope.$on('event:auth-loginConfirmed', function() {
            $scope.username = auth.getUsername();
        });

        $scope.setRoute = function(route) {
            $location.path(route);
            $scope.isCollapsed = true;
        };

        $scope.isActive = function(route) {
            return ($location.path() == route);
        };

        $scope.logout = function () {
            auth.logout();
            $location.path('/');
        };

        $scope.manageUserAccount = function() {
            // stub -- call setRoute()
        };

        $scope.changeUserPassword = function() {
            // stub
        };

        $scope.simulateTimeout = function() {
            auth.simulateTimeout();
        };
    }
})();