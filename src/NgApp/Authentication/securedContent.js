angular.module('app.authentication')
    .directive('securedContent', ['authService', SecuredContentDirective]);

function SecuredContentDirective(auth) {
    return {
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
            scope.loginRequired = false;
            scope.loginConfirmed = false;
            
            scope.$on('event:auth-loginRequired', function () {
                scope.loginConfirmed = false;
                scope.loginRequired = true;
            });

            scope.$on('event:auth-loginCancelled', function () {
                scope.loginConfirmed = false;
                scope.loginRequired = true;
            });

            scope.$on('event:auth-loginConfirmed', function () {
                scope.loginRequired = false;
                scope.loginConfirmed = true;
            });
        }
    };
};
