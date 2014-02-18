angular.module('app.authentication', ['http-auth-interceptor', 'LocalStorageModule', 'base64']);

angular.module('app.authentication')
    .constant('authSettings', {
        authTokenValidateUrl: '',
        authLoginUrl: ''
    });