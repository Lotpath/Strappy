angular.module('app.authentication')
    .factory('authService', ['$rootScope', '$q', '$http', 'globals', 'authSettings', 'authInterceptor', 'localStorageService', '$base64', AuthService]);

function AuthService($rootScope, $q, $http, globals, settings, interceptor, localStorage, base64) {

    return {
        validate: function () {
            var credentials = localStorage.get('userCredentials');
            if (credentials === null) {
                interceptor.loginRequired();
            } else {
                $http({
                    method: 'GET',
                    url: globals.baseApiUrl + settings.authValidateUrl,
                    headers: { 'Authorization': 'Basic ' + credentials },
                    ignoreAuthModule: true
                })
                    .success(function (data, status, headers, config) {
                        if (status === 200) {
                            $http.defaults.headers.common['Authorization'] = 'Basic ' + credentials;
                            interceptor.loginConfirmed();
                        } else {
                            interceptor.loginInvalid({
                                response: data,
                                status: status,
                                message: "Your session has timed out.  Please log in again."
                            });
                        }
                    })
                    .error(function (data, status) {
                        interceptor.loginInvalid({
                            response: data,
                            status: status,
                            message: "Your session has timed out.  Please log in again."
                        });
                    });
            }
        },

        login: function (username, password) {
            var credentials = base64.encode(username + ':' + password);
            $http({
                method: 'GET',
                url: globals.baseApiUrl + settings.authLoginUrl,
                headers: { 'Authorization': 'Basic ' + credentials },
                ignoreAuthModule: true
            })
                .success(function (data, status, headers, config) {
                    if (status === 200) {
                        localStorage.remove('userCredentials');
                        localStorage.add('userCredentials', credentials);
                        $http.defaults.headers.common['Authorization'] = 'Basic ' + credentials;
                        interceptor.loginConfirmed();
                    } else {
                        interceptor.loginInvalid({
                            response: data,
                            status: status,
                            message: "There was an unknown error.\r\nPlease try again or contact your system administrator. " + status
                        });
                    }
                })
                .error(function (data, status) {
                    if (status === 401) {
                        interceptor.loginInvalid({
                            response: data,
                            status: status,
                            message: "Invalid username or password."
                        });
                    } else {
                        interceptor.loginInvalid({
                            response: data,
                            status: status,
                            message: "There was an unknown error.\r\nPlease try again or contact your system administrator. " + status
                        });
                    }
                });
        },

        logout: function () {
            localStorage.remove('userCredentials');
            interceptor.loginRequired();
        },
    };
};
