(function() {
    angular.module('app.authentication').factory('authService', factory);
    factory.$inject = ['$rootScope', '$q', '$http', 'authSettings', 'authInterceptor', 'localStorageService', '$base64'];

    function factory($rootScope, $q, $http, settings, interceptor, localStorage, base64) {
        var isAuthenticated = false;
        return {
            validate: function () {
                var credentials = localStorage.get(settings.localStorageTokenKey);
                if (credentials === null) {
                    interceptor.loginRequired();
                    isAuthenticated = false;
                } else {
                    $http({
                        method: 'GET',
                        url: settings.authValidateUrl,
                        headers: { 'Authorization': 'Basic ' + credentials },
                        ignoreAuthModule: true
                    })
                        .success(function (data, status, headers, config) {
                            if (status === 200) {
                                $http.defaults.headers.common['Authorization'] = 'Basic ' + credentials;
                                interceptor.loginConfirmed();
                                isAuthenticated = true;
                            } else {
                                interceptor.loginRequired({
                                    response: data,
                                    status: status,
                                    message: settings.messages.sessionTimedOut
                                });
                                isAuthenticated = false;
                            }
                        })
                        .error(function (data, status) {
                            interceptor.loginRequired({
                                response: data,
                                status: status,
                                message: settings.messages.sessionTimedOut
                            });
                            isAuthenticated = false;
                        });
                }
            },

            login: function (username, password) {
                var credentials = base64.encode(username + ':' + password);
                $http({
                    method: 'GET',
                    url: settings.authLoginUrl,
                    headers: { 'Authorization': 'Basic ' + credentials },
                    ignoreAuthModule: true
                })
                    .success(function (data, status, headers, config) {
                        if (status === 200) {
                            localStorage.remove(settings.localStorageTokenKey);
                            localStorage.add(settings.localStorageTokenKey, credentials);

                            localStorage.remove(settings.localStorageUserNameKey);
                            localStorage.add(settings.localStorageUserNameKey, username);

                            $http.defaults.headers.common['Authorization'] = 'Basic ' + credentials;
                            interceptor.loginConfirmed();
                            isAuthenticated = true;
                        } else {
                            interceptor.loginRequired({
                                response: data,
                                status: status,
                                message: settings.messages.unknownError + ' ' + status
                            });
                            isAuthenticated = false;
                        }
                    })
                    .error(function (data, status) {
                        if (status === 401) {
                            interceptor.loginRequired({
                                response: data,
                                status: status,
                                message: settings.messages.unauthorized
                            });
                            isAuthenticated = false;
                        } else {
                            interceptor.loginRequired({
                                response: data,
                                status: status,
                                message: settings.messages.unknownError + ' ' + status
                            });
                            isAuthenticated = false;
                        }
                    });
            },

            logout: function () {
                localStorage.remove(settings.localStorageTokenKey);
                localStorage.remove(settings.localStorageUserNameKey);
                interceptor.loginRequired();
                isAuthenticated = false;
            },

            getUsername: function () {
                return localStorage.get(settings.localStorageUserNameKey);
            },

            simulateTimeout: function () {
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