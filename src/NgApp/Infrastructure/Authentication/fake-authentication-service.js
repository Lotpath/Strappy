(function() {
    angular.module('app.authentication').factory('authService', factory);
    factory.$inject = ['$rootScope', '$q', '$http', 'authSettings', 'authInterceptor', 'localStorageService', '$base64'];

    function factory($rootScope, $q, $http, settings, interceptor, localStorage, base64) {
        var validUsername = "demo";
        var validPassword = "demo";
        var isAuthenticated = false;
        return {
            validate: function() {
                var credentials = localStorage.get(settings.localStorageTokenKey);
                if (credentials === null) {
                    interceptor.loginRequired();
                    isAuthenticated = false;
                } else {
                    if (base64.decode(credentials) == validUsername + ":" + validPassword) {
                        interceptor.loginConfirmed();
                        isAuthenticated = true;
                    } else {
                        interceptor.loginRequired({
                            response: null,
                            status: status,
                            message: settings.messages.sessionTimedOut
                        });
                        isAuthenticated = false;
                    }
                }
            },

            login: function(username, password) {
                if (username == validUsername && password == validPassword) {
                    var credentials = base64.encode(username + ':' + password);

                    localStorage.remove(settings.localStorageTokenKey);
                    localStorage.add(settings.localStorageTokenKey, credentials);

                    localStorage.remove(settings.localStorageUserNameKey);
                    localStorage.add(settings.localStorageUserNameKey, username);

                    interceptor.loginConfirmed();
                    isAuthenticated = true;
                } else {
                    interceptor.loginRequired({
                        response: null,
                        status: status,
                        message: settings.messages.unauthorized
                    });
                    isAuthenticated = false;
                }
            },

            logout: function() {
                localStorage.remove(settings.localStorageTokenKey);
                localStorage.remove(settings.localStorageUserNameKey);
                interceptor.loginRequired();
                isAuthenticated = false;
            },

            getUsername: function() {
                return localStorage.get(settings.localStorageUserNameKey);
            },

            simulateTimeout: function() {
                var credentials = localStorage.get(settings.localStorageTokenKey);
                credentials = credentials.replace('Z', 'X');
                localStorage.remove(settings.localStorageTokenKey);
                localStorage.add(settings.localStorageTokenKey, credentials);
                isAuthenticated = false;
            },
            isAuthenticated: function () {
                return isAuthenticated;
            }
        };
    };
})();