angular.module('eventsApp.directive.datePicker', [])
    .directive('eventDatePicker', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
             link: function (scope, element, attrs, ngModelCtrl) {
                element.datepicker({
                    dateFormat: 'yy-mm-dd',
                    onSelect: function (date) {
                        scope.date = date;
                        scope.$apply();
                    }
                });
            }
        };
});