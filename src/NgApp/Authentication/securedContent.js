angular.module('app.authentication')
    .directive('securedContent', [SecuredContentDirective]);

function SecuredContentDirective() {
    return {
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
            scope.loginRequired = null;

            scope.$on('event:auth-loginRequired', function () {
                scope.loginRequired = true;
            });

            scope.$on('event:auth-loginCancelled', function () {
                scope.loginRequired = true;
            });

            scope.$on('event:auth-loginConfirmed', function () {
                scope.loginRequired = false;
            });
        }
    };
};
