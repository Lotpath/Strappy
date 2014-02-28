angular.module('app.home', ['ngSanitize', 'app.authentication']);

angular.module('app.home')
    .controller('HomeCtrl', ['$scope', 'authService', HomeCtrl]);

function HomeCtrl($scope, authService) {
    $scope.title = 'Welcome to Strappy!';
    
    $scope.alerts = [
        { type: 'success', message: 'Well done! You successfully set up this project.' },
        { type: 'danger', message: 'Guess what... This is only the beginning!' },
        { type: 'info', message: 'Strappy uses <a href="http://angularjs.org" target="_blank">AngularJS</a>, <a href="http://getbootstrap.com/" target="_blank">Bootstrap</a>, <a href="http://angular-ui.github.io/bootstrap/" target="_blank">Angular UI Bootstrap</a>, and <a href="http://fontawesome.io/" target="_blank">FontAwesome</a>.  Visit these sites to see what else you can do!' }
    ];

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    authService.validate();
}
