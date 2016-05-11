angular.module('eventsApp.controllers.eventTabCtrl', [])
	.controller('eventTabCtrl', ['$scope', 'eventsFactory', function($scope, eventsFactory) {

	eventsFactory.getEventsList().then(function (resp) {
        $scope.eventsList = resp.data;
    });

    $scope.filterEvents = function(searchTxt) {
    	if ($scope.address !== '') {
    		eventsFactory.getFilterEvents(searchTxt).then(function (resp) {
    			$scope.eventsList = resp.data; 
		    });
    	} else {
    		eventsFactory.getEventsList().then(function (resp) {
		        $scope.eventsList = resp.data;
		    });
    	}   	
    }

}]);

