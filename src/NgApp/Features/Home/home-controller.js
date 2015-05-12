(function() {
    angular.module('app.home').controller('HomeCtrl', controller);
    controller.$inject = ['$scope', 'messagesService'];

    function controller($scope, messages) {
        $scope.title = 'Welcome to Strappy!';

        $scope.alerts = [
            { type: 'success', message: 'Well done! You successfully set up this project.' },
            { type: 'danger', message: 'Guess what... There is so much more!' },
            { type: 'info', message: 'Strappy uses <a href="http://angularjs.org" target="_blank">AngularJS</a>, <a href="http://getbootstrap.com/" target="_blank">Bootstrap</a>, <a href="http://angular-ui.github.io/bootstrap/" target="_blank">Angular UI Bootstrap</a>, and <a href="http://fontawesome.io/" target="_blank">FontAwesome</a>.  Visit these sites to see what else you can do!' }
        ];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.toastSuccess = function () {
            messages.toastr.success('Yay Strappy!', 'Hello World!');
        };

        $scope.toastErrorList = function() {
            messages.toastr.error(messages.toList(['One', 'Two', 'Three']), 'Errors occurred:', {
                allowHtml: true,
                closeButton: true,
                timeOut: 0
            });
        };

        $scope.toastInfo = function() {
            messages.toastr.info('Visit <a href="https://github.com/Foxandxss/angular-toastr" target="_blank">Angular-Toastr on Github</a>', 'For more info...', {
                allowHtml: true,
                closeButton: true,
                timeOut: 0
            });
        };

        $scope.dialogConfirm = function() {
            var dialog = messages.dialogs.confirm('Are you sure you want to continue?', 'Please confirm', {
                backdrop: 'static'
            });
            
            dialog.result.then(
                function(button) {
                    messages.toastr.success('You said ' + button);
                },
                function(button) {
                    messages.toastr.error('You said ' + button);
                });
        };

        $scope.dialogErrorList = function() {
            messages.dialogs.error('Errors occurred:', messages.toList(['Foo', 'Bar', 'Baz']));
        };

        $scope.dialogNotify = function () {
            messages.dialogs.notify('More Info', 'Visit <a href="https://github.com/m-e-conroy/angular-dialog-service" target="_blank">Angular Dialog Service on Github</a>');
        };

        $scope.logError = function () {
            messages.log.debug('An error message was written to the console');
        };
        
        $scope.logInfo = function () {
            messages.log.info('For more info, visit https://docs.angularjs.org/api/ng/service/$log');
        };
    }
})();