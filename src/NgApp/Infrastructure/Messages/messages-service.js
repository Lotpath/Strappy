(function() {
    angular.module('app.messages').factory('messagesService', factory);
    factory.$inject = ['toastr', 'dialogs', '$log'];

    function factory(toastr, dialogs, log) {
        return {
            toastr: toastr,
            dialogs: dialogs,
            log: log,
            toList: function(messages) {
                var displayMessage = "<ul>";
                angular.forEach(messages, function(item) {
                    displayMessage += "<li>" + item + "</li>";
                });
                displayMessage += "</ul>";
                return displayMessage;                
            }
        };
    }
})();
