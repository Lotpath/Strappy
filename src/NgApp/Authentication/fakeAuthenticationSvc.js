angular.module('app.authentication')
    .factory('authService', ['$rootScope', '$q', '$http', 'globals', 'authSettings', 'authInterceptor', 'localStorageService', '$base64', AuthService]);

function AuthService($rootScope, $q, $http, globals, settings, interceptor, localStorage, base64) {
    var validUsername = "demo";
    var validPassword = "demo";

    return {
        validate: function () {
            var credentials = localStorage.get(settings.localStorageTokenKey);
            if (credentials === null) {
                interceptor.loginRequired();
            } else {
                if (base64.decode(credentials) == validUsername + ":" + validPassword) {
                    interceptor.loginConfirmed();
                } else {
                    interceptor.loginRequired({
                        response: null,
                        status: status,
                        message: settings.messages.sessionTimedOut
                    });
                }
            }
        },

        login: function (username, password) {
            if (username == validUsername && password == validPassword) {
                var credentials = base64.encode(username + ':' + password);

                localStorage.remove(settings.localStorageTokenKey);
                localStorage.add(settings.localStorageTokenKey, credentials);

                localStorage.remove(settings.localStorageUserNameKey);
                localStorage.add(settings.localStorageUserNameKey, username);

                interceptor.loginConfirmed();
            } else {
                interceptor.loginRequired({
                    response: null,
                    status: status,
                    message: settings.messages.unauthorized
                });
            }
        },

        logout: function () {
            localStorage.remove(settings.localStorageTokenKey);
            localStorage.remove(settings.localStorageUserNameKey);
            interceptor.loginRequired();
        },
        
        getUsername: function() {
            return localStorage.get(settings.localStorageUserNameKey);
        },
        
        simulateTimeout: function () {
            var credentials = localStorage.get(settings.localStorageTokenKey);
            credentials = credentials.replace('Z', 'X');
            localStorage.remove(settings.localStorageTokenKey);
            localStorage.add(settings.localStorageTokenKey, credentials);
        }
    };
};
