angular.module('app.authentication')
    .controller('LoginCtrl', ['$scope', '$http', 'authService', LoginCtrl]);

function LoginCtrl($scope, $http, auth) {

    $scope.authenticating = false;

    $scope.login = function (user) {
        if (!user || !user.username || !user.password) {
            notAuthenticated("Please enter a valid username and password.");
            return;
        }

        $scope.authenticating = true;
        auth.login(user.username, user.password);
    };

    $scope.$on('event:auth-loginConfirmed', function () {
        $scope.authenticating = false;
    });

    $scope.$on('event:auth-loginRequired', function (data, response) {
        $scope.user = {};
        $scope.authenticating = false;
        if (!response) {
            $scope.message = "";
            $scope.showMessage = false;
        } else {
            var message = (typeof response.message === "undefined") ? "" : response.message;
            if (message != "") {
                var messageClass = (typeof response.messageClass === "undefined") ? "text-danger" : response.messageClass;
                $scope.message = message;
                $scope.messageClass = messageClass;
                $scope.showMessage = true;
            }
        }
    });
}