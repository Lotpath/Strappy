(function() {
    var module = angular.module('app.messages', ['ngSanitize', 'toastr', 'dialogs.main']);

    module.config(function (toastrConfig) {
        angular.extend(toastrConfig, {
            positionClass: 'toast-bottom-right'
        });
    });

    module.config(['dialogsProvider', function (dialogsProvider) {
        dialogsProvider.setSize('md');
    }]);
})();