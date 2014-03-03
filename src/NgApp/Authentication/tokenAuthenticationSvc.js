angular.module('app.authentication')
    .factory('authService', ['$rootScope', '$q', '$http', 'globals', 'authSettings', 'authInterceptor', 'localStorageService', AuthService]);

function AuthService($rootScope, $q, $http, globals, settings, interceptor, localStorage) {

    return {
        validate: function () {
            var token = localStorage.get(settings.localStorageTokenKey);
            if (token === null) {
                interceptor.loginRequired();
            } else {
                $http({
                    method: 'GET',
                    url: globals.baseApiUrl + settings.authValidateUrl,
                    headers: { 'Authorization': settings.token.authHeaderPrefix + token },
                    ignoreAuthModule: true
                })
                    .success(function (data, status, headers, config) {
                        if (status === 200) {
                            $http.defaults.headers.common['Authorization'] = settings.token.authHeaderPrefix + token;
                            interceptor.loginConfirmed();
                        } else {
                            interceptor.loginRequired({
                                response: data,
                                status: status,
                                message: settings.messages.sessionTimedOut
                            });
                        }
                    })
                    .error(function (data, status) {
                        interceptor.loginRequired({
                            response: data,
                            status: status,
                            message: settings.messages.sessionTimedOut
                        });
                    });
            }
        },

        login: function (username, password) {
            var formData = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
            $http({
                method: 'POST',
                url: globals.baseApiUrl + settings.authLoginUrl,
                data: formData,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                ignoreAuthModule: true
            })
                .success(function (data, status, headers, config) {
                    if (status === 200) {
                        var token = data[settings.token.returnPropertyName];
                        localStorage.remove(settings.localStorageTokenKey);
                        localStorage.add(settings.localStorageTokenKey, token);

                        localStorage.remove(settings.localStorageUserNameKey);
                        localStorage.add(settings.localStorageUserNameKey, username);

                        $http.defaults.headers.common['Authorization'] = settings.token.authHeaderPrefix + token;
                        interceptor.loginConfirmed();
                    } else {
                        interceptor.loginRequired({
                            response: data,
                            status: status,
                            message: settings.messages.unknownError + ' ' + status
                        });
                    }
                })
                .error(function (data, status) {
                    if (status === 401) {
                        interceptor.loginRequired({
                            response: data,
                            status: status,
                            message: settings.messages.unauthorized
                        });
                    } else {
                        interceptor.loginRequired({
                            response: data,
                            status: status,
                            message: settings.messages.unknownError + ' ' + status
                        });
                    }
                });
        },

        logout: function () {
            localStorage.remove(settings.localStorageTokenKey);
            localStorage.remove(settings.localStorageUserNameKey);
            interceptor.loginRequired();
        },
        
        getUsername: function () {
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
