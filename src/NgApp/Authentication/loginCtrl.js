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

    $scope.$on('event:auth-loginInvalid', function (data, response) {
        $scope.authenticating = false;
        notAuthenticated(response.message);
    });

    $scope.$on('event:auth-loginConfirmed', function () {
        $scope.authenticating = false;
    });

    $scope.$on('event:auth-loginRequired', function () {
        $scope.user = {};
        $scope.message = "";
        $scope.showMessage = false;
    });

    function notAuthenticated(message, messageClass) {
        message = (typeof message === "undefined") ? "" : message;
        if (message === "") return;

        messageClass = (typeof messageClass === "undefined") ? "text-danger" : messageClass;
        $scope.message = message;
        $scope.messageClass = messageClass;
        $scope.showMessage = true;
    }
}