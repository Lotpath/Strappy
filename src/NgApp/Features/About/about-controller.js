(function() {
    angular.module('app.about').controller('AboutCtrl', controller);
    controller.$inject = ['$scope'];

    function controller($scope) {
        $scope.title = 'About Strappy';
    }
})();