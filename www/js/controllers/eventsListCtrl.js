angular.module('eventsApp.controllers.eventsListCtrl', ['eventsApp.directive.datePicker'])
    .controller('eventsListCtrl', ['$scope', 'eventsFactory', function($scope, eventsFactory) {
	
    eventsFactory.getEventsList().then(function (resp) {
        $scope.eventsList = resp.data;
    });
    
    eventsFactory.getFeaturedEvents().then(function (resp) {
        $scope.featuredEvents = resp.data;
    });
    
    eventsFactory.getTopDealsEvents().then(function (resp) {
        $scope.topDealsEvents = resp.data; 
    });
}]);
