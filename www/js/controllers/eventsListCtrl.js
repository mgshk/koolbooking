angular.module('eventsApp.controllers.eventsListCtrl', ['720kb.datepicker'])
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
    
    $scope.$watch('start_date', function (value) {
        $scope.startDate = new Date(value);
        
        console.log($scope.startDate);
    });
}]);
