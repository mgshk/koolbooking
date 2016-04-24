angular.module('eventsApp.controllers.eventsListCtrl', [])
    .controller('eventsListCtrl', ['$scope', '$state', 'eventsFactory', function($scope, $state, eventsFactory) {
	
    eventsFactory.getEventsList().then(function (resp) {
        $scope.eventsList = resp.data;
    });
    
    eventsFactory.getFeaturedEvents().then(function (resp) {
        $scope.featuredEvents = resp.data;
    });
    
    eventsFactory.getTopDealsEvents().then(function (resp) {
        $scope.topDealsEvents = resp.data; 
    });
    
    /*$scope.$watch('start_date', function (value) {
        $scope.startDate = new Date(value);
    }); 
    
    $scope.filterEvents = function () {
        $state.go('filterEvents', {'address': $scope.address, 'start_date': $scope.startDate});
    }*/
}]);
