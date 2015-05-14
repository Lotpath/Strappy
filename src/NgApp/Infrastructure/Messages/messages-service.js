(function() {
    angular.module('app.messages').factory('messagesService', factory);
    factory.$inject = ['$rootScope', 'toastr', 'dialogs', '$log', 'messagesConfig'];

    function factory($rootScope, toastr, dialogs, log, messagesConfig) {
        return {
            success: function (message, title, options, logData) {
                _handleToast('success', message, title, options, logData);
            },
            
            warn: function (message, title, options, logData) {
                _handleToast('warn', message, title, options, logData);
            },
            
            info: function (message, title, options, logData) {
                _handleToast('info', message, title, options, logData);
            },

            error: function (message, title, options, logData) {
                _handleToast('error', message, title, options, logData);
            },

            errorDialog: function (message, title, closedFn, options, logData) {
                _handleDialog('error', message, title, options, logData).then(closedFn);
            },

            notify: function (message, title, closedFn, options, logData) {
               _handleDialog('notify', message, title, options, logData).then(closedFn);
            },

            confirm: function (message, title, yesFn, noFn, options) {
                var dialog = _handleDialog('confirm', message, title, options);
                dialog.then(
                    function (btn) {
                        _handleLog('confirm', message, btn);
                        yesFn(btn);
                    },
                    function (btn) {
                        _handleLog('confirm', message, btn);
                        noFn(btn);
                    });
            },

            wait: {
                start: function (message, title, openedFn, options, logData) {
                    _handleDialog('wait', message, title, options, logData).then(openedFn);
                },
                progress: function (progress, progressFn) {
                    _handleLog('wait', '', progress);
                    $rootScope.$broadcast('dialogs.wait.progress', { 'progress': progress });
                    progressFn();
                },
                end: function (closedFn) {
                    _handleLog('wait', '', 100);
                    $rootScope.$broadcast('dialogs.wait.complete');
                    closedFn();
                }
            },
                        
            log: log
        };
        
        function _handleToast(type, message, title, options, logData) {
            _handleLog(type, message, logData);

            if (Array.isArray(message)) {
                message = _formatList(message);
                options = angular.extend(options || {}, { allowHtml: true });
            }

            _toastHandlers()[type](message, title, options);
        }

        function _handleDialog(type, message, title, options, logData) {
            _handleLog(type, message, logData);

            if (Array.isArray(message)) {
                message = _formatList(message);
            }

            var dlg = _dialogHandlers()[type](message, title, options);
            return dlg.result;
        }
        
        function _handleLog(type, message, logData) {
            if (_getOptions().logAll) {
                _logHandlers()[type](message, logData);
            }
        }

        function _toastHandlers() {
            var handlers = {};
            
            handlers.success = function (message, title, options) {
                toastr.success(message, title, options);
            };

            handlers.warn = function (message, title, options) {
                toastr.warning(message, title, options);
            };

            handlers.error = function (message, title, options) {
                toastr.error(message, title, options);
            };

            handlers.info = function (message, title, options) {
                toastr.info(message, title, options);
            };

            return handlers;
        }
        
        function _dialogHandlers() {
            var handlers = {};

            handlers.notify = function (message, title, options) {
                return dialogs.notify(title, message, options);
            };

            handlers.error = function (message, title, options) {
                return dialogs.error(title, message, options);
            };

            handlers.wait = function (message, title, options) {
                return dialogs.wait(title, message, 0, options);
            };

            handlers.confirm = function(message, title, options) {
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
