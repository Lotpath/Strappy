(function() {
    angular.module('app.home').controller('HomeCtrl', controller);
    controller.$inject = ['$scope', '$timeout', 'messagesService'];

    function controller($scope, $timeout, messages) {
        $scope.title = 'Welcome to Strappy!';

        $scope.alerts = [
            { type: 'success', message: 'Well done! You successfully set up this project.' },
            { type: 'danger', message: 'Guess what... There is so much more!' },
            { type: 'info', message: 'Strappy uses <a href="http://angularjs.org" target="_blank">AngularJS</a>, <a href="http://getbootstrap.com/" target="_blank">Bootstrap</a>, <a href="http://angular-ui.github.io/bootstrap/" target="_blank">Angular UI Bootstrap</a>, and <a href="http://fontawesome.io/" target="_blank">FontAwesome</a>.  Visit these sites to see what else you can do!' }
        ];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.success = function () {
            messages.success('Yay Strappy!', 'Hello World!');
        };

        $scope.warn = function () {
            messages.warn('', 'Betta check yo self');
        };

        $scope.error = function() {
            messages.error('Errors occurred:', ['One', 'Two', 'Three'], {
                closeButton: true,
                timeOut: 0
            });
        };

        $scope.info = function() {
            messages.info('For more info...', 'Visit <a href="https://github.com/Foxandxss/angular-toastr" target="_blank">Angular-Toastr on Github</a>', {
                allowHtml: true,
                closeButton: true,
                timeOut: 0
            });
        };

        $scope.confirm = function() {
            messages.confirm(
                'Confirm the following:',
                ['The cat\'s in the cradle', 'The spoon is silver', 'The little boy is blue', 'The man is on the moon'],
                function(button) {
                    messages.success('', 'You said ' + button);
                },
                function(button) {
                    messages.error('', 'You said ' + button);
                },
                {
                    backdrop: 'static'
                });            
        };

        $scope.notify = function () {
            messages.notify('More Info', 'Visit <a href="https://github.com/m-e-conroy/angular-dialog-service" target="_blank">Angular Dialog Service on Github</a>');
        };

        $scope.wait = function() {
            messages.wait.start('Please wait', 'Big file downloading', {backdrop: 'static'});
            $timeout(function() {
                messages.wait.progress(25);
            }, 1000);
            $timeout(function () {
                messages.wait.progress(50);
            }, 2000);
            $timeout(function () {
                messages.wait.progress(75);
            }, 3000);
            $timeout(function () {
                messages.wait.progress(100);
            }, 4000);
        };

        $scope.errorDialog = function() {
            messages.errorDialog('Errors occurred:', ['Foo', 'Bar', 'Baz']);
        };

        $scope.logLog = function () {
            messages.log.log('A generic log message.');
        };
        
        $scope.debugLog = function () {
            messages.log.debug('A debug log message.');
        };
        
        $scope.warnLog = function () {
            messages.log.warn('A warning log message.');
        };
        
        $scope.errorLog = function () {
            messages.log.error('An error occurred!');
        };
        
        $scope.infoLog = function () {
            messages.log.info('For more info, visit https://docs.angularjs.org/api/ng/service/$log');
        };
    }
})();