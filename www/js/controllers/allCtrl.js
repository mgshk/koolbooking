angular.module('eventsApp.controllers.allCtrl', [])
	.controller('allCtrl', ['$scope', 'eventsFactory', function($scope, eventsFactory) {

	eventsFactory.getEventsList().then(function (resp) {
        $scope.eventsList = resp.data;
    });

    $scope.filterEvents = function(start_date, end_date, address) {

        var startDate = $filter('date')(start_date, "yyyy-MM-dd");
        var endDate = null;

        if(end_date !== '')
            endDate = $filter('date')(end_date, "yyyy-MM-dd");

    	if (address !== '' && start_date !== '') {
    		eventsFactory.getFilterEvents(address, startDate, endDate).then(function (resp) {
    			$scope.eventsList = resp.data; 
		    });
    	} else {
    		eventsFactory.getEventsList().then(function (resp) {
		        $scope.eventsList = resp.data;
		    });
    	}   	
    }

}]);
