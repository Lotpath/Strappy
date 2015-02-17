(function() {
    angular.module('app.demo').controller('DemoCtrl', controller);
    controller.$inject = ['$window', '$rootScope'];

    function controller($window, $rootScope) {
        if ($rootScope.isDemo) {
            $window.document.title = "** DEMO ** " + $window.document.title;
        }
    }
})();