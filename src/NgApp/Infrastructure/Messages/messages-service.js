(function() {
    angular.module('app.messages').factory('messagesService', factory);
    factory.$inject = ['$rootScope', 'toastr', 'dialogs', '$log', 'messagesConfig'];

    function factory($rootScope, toastr, dialogs, log, messagesConfig) {
        return {
            success: function (title, message, options, logData) {
                _handleToast('success', title, message, options, logData);
            },
            
            warn: function (title, message, options, logData) {
                _handleToast('warn', title, message, options, logData);
            },
            
            info: function (title, message, options, logData) {
                _handleToast('info', title, message, options, logData);
            },

            error: function (title, message, options, logData) {
                _handleToast('error', title, message, options, logData);
            },

            notify: function (title, message, options, logData) {
                _handleDialog('notify', title, message, options, logData);
            },

            confirm: confirm,

            wait: {
                start: function (title, message, options, logData) {
                    _handleDialog('wait', title, message, options, logData);
                },
                progress: waitProgress,
                end: waitEnd
            },

            errorDialog: function (title, message, options, logData) {
                _handleDialog('error', title, message, options, logData);
            },
                        
            log: log
        };

        function confirm(title, message, yesFn, noFn, options) {
            var dialog = _handleDialog('confirm', title, message, options);
            dialog.result.then(
                function (btn) {
                    _handleLog('confirm', message, btn);
                    yesFn(btn);
                },
                function (btn) {
                    _handleLog('confirm', message, btn);
                    noFn(btn);
                });
        }
        
        function waitProgress(progress) {
            if (progress == 100) {
                waitEnd();
            } else {
                _handleLog('wait', '', progress);
                $rootScope.$broadcast('dialogs.wait.progress', { 'progress': progress });
            }
        }

        function waitEnd() {
            _handleLog('wait', '', 100);
            $rootScope.$broadcast('dialogs.wait.progress', { 'progress': 100 });
            $rootScope.$broadcast('dialogs.wait.complete');
        }
        
        function _handleToast(type, title, message, options, logData) {
            _handleLog(type, message, logData);

            if (Array.isArray(message)) {
                message = _formatList(message);
                options = angular.extend(options || {}, { allowHtml: true });
            }

            _toastHandlers()[type](title, message, options);
        }

        function _handleDialog(type, title, message, options, logData) {
            _handleLog(type, message, logData);

            if (Array.isArray(message)) {
                message = _formatList(message);
            }

            return _dialogHandlers()[type](title, message, options);
        }
        
        function _handleLog(type, message, logData) {
            if (_getOptions().logAll) {
                _logHandlers()[type](message, logData);
            }
        }

        function _toastHandlers() {
            var handlers = {};
            
            handlers.success = function(title, message, options) {
                toastr.success(message, title, options);
            };

            handlers.warn = function (title, message, options) {
                toastr.warning(message, title, options);
            };

            handlers.error = function (title, message, options) {
                toastr.error(message, title, options);
            };

            handlers.info = function (title, message, options) {
                toastr.info(message, title, options);
            };

            return handlers;
        }
        
        function _dialogHandlers() {
            var handlers = {};

            handlers.notify = function(title, message, options) {
                dialogs.notify(title, message, options);
            };

            handlers.error = function(title, message, options) {
                dialogs.error(title, message, options);
            };

            handlers.wait = function(title, message, options) {
                dialogs.wait(title, message, 0, options);
            };

            handlers.confirm = function (title, message, options) {
                return dialogs.confirm(title, message, options);
            };

            return handlers;
        }

        function _logHandlers() {
            var handlers = {};

            handlers.success = function (message, logData) {
                if (typeof(logData) === 'undefined') {
                    log.log('Success: ' + message);
                } else {
                    log.log('Success: ' + message, logData);
                }
            };

            handlers.info = function(message, logData) {
                if (typeof (logData) === 'undefined') {
                    log.info('Info: ' + message);
                } else {
                    log.info('Info: ' + message, logData);
                }
            };
            
            handlers.error = function(message, logData) {
                if (typeof (logData) === 'undefined') {
                    log.error('Error: ' + message);
                } else {
                    log.error('Error: ' + message, logData);
                }
            };
            
            handlers.warn = function(message, logData) {
                if (typeof (logData) === 'undefined') {
                    log.warn('Warning: ' + message);
                } else {
                    log.warn('Warning: ' + message, logData);
                }
            };

            handlers.notify = function (message, logData) {
                if (typeof (logData) === 'undefined') {
                    log.info('Notify: ' + message);
                } else {
                    log.info('Notify: ' + message, logData);
                }
            };

            handlers.confirm = function (message, logData) {
                if (typeof (logData) === 'undefined') {
                    log.info('Confirm: ' + message);
                } else {
                    log.info('Confirm: ' + message, logData);
                }
            };

            handlers.wait = function (message, logData) {
                if (typeof (logData) === 'undefined') {
                    log.info('Wait: ' + message);
                } else {
                    log.info('Wait: ' + message, logData);
                }
            };

            return handlers;
        }

        function _getOptions() {
            return angular.extend({}, messagesConfig);
        }

        function _formatList(messages) {
            var html = "<ul>";
            angular.forEach(messages, function(msg) {
                html += "<li>" + msg + "</li>";
            });
            html += "</ul>";
            return html;
        }
    }
})();
