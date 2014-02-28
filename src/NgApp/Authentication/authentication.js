angular.module('app.authentication', ['http-auth-interceptor', 'LocalStorageModule', 'base64', 'app.globals']);

angular.module('app.authentication')
    .constant('authSettings', {
        authValidateUrl: '/auth/validation',
        authLoginUrl: '/auth/credentials',
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