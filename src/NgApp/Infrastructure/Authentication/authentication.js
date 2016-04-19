(function() {
    angular.module('app.authentication')
        .constant('authSettings', {
            authValidateUrl: 'api/auth/validation',
            authLoginUrl: 'api/auth/credentials',
            localStorageTokenKey: 'userToken',
            localStorageUserNameKey: 'userName',
            token: {
                authHeaderPrefix: 'Token ',
                returnPropertyName: 'token'
            },
            messages: {
                sessionTimedOut: 'Your session has timed out.  Please log in again.',
                unknownError: 'There was an unknown error.\r\nPlease try again or contact your system administrator.' + status,
                unauthorized: 'Invalid username or password.',
            }
        });
})();