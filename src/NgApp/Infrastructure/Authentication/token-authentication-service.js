(function() {
    angular.module('app.authentication').factory('authService', factory);
    factory.$inject = ['$rootScope', '$q', '$http', 'authSettings', 'authInterceptor', 'localStorageService'];

    function factory($rootScope, $q, $http, settings, interceptor, localStorage) {
        var isAuthenticated = false;
        return {
            validate: function() {
                var token = localStorage.get(settings.localStorageTokenKey);
                if (token === null) {
                    interceptor.loginRequired();
                } else {
                    $http({
                        method: 'GET',
                        url: settings.authValidateUrl,
                        headers: { 'Authorization': settings.token.authHeaderPrefix + token },
                        ignoreAuthModule: true
                    })
                        .success(function(data, status, headers, config) {
                            if (status === 200) {
                                $http.defaults.headers.common['Authorization'] = settings.token.authHeaderPrefix + token;
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
                        .error(function(data, status) {
                            interceptor.loginRequired({
                                response: data,
                                status: status,
                                message: settings.messages.sessionTimedOut
                            });
                            isAuthenticated = false;
                        });
                }
            },

            login: function(username, password) {
                var formData = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
                $http({
                    method: 'POST',
                    url: settings.authLoginUrl,
                    data: formData,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    ignoreAuthModule: true
                })
                    .success(function(data, status, headers, config) {
                        if (status === 200) {
                            var token = data[settings.token.returnPropertyName];
                            localStorage.remove(settings.localStorageTokenKey);
                            localStorage.add(settings.localStorageTokenKey, token);

                            localStorage.remove(settings.localStorageUserNameKey);
                            localStorage.add(settings.localStorageUserNameKey, username);

                            $http.defaults.headers.common['Authorization'] = settings.token.authHeaderPrefix + token;
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
                    .error(function(data, status) {
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
