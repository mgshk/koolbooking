angular.module('eventsApp.controllers.eventTabCtrl', [])
	.controller('eventTabCtrl', ['$scope', '$filter', 'eventsFactory', function($scope, $filter, eventsFactory) {

    $scope.noRecords = false;

	eventsFactory.getEventsList().then(function (resp) {
        $scope.eventsList = resp.data;
    });

    $scope.filterEvents = function(start_date, end_date, address) {

        var startDate = $filter('date')(start_date, "yyyy-MM-dd");
        var endDate = null;

        if(angular.isDefined(end_date))
            endDate = $filter('date')(end_date, "yyyy-MM-dd");

        if ((angular.isDefined(address) || address !== '') && angular.isDefined(start_date)) {
    		eventsFactory.getFilterEvents(address, startDate, endDate).then(function (resp) {
                if(resp.status === 0) {
                    $scope.noRecords = true;
                } else {
                    $scope.noRecords = false;
                    $scope.eventsList = resp.data;
                } 
		    });
    	} else {
    		eventsFactory.getEventsList().then(function (resp) {
		        if(resp.status === 0) {
                    $scope.noRecords = true;
                } else {
                    $scope.noRecords = false;
                    $scope.eventsList = resp.data;
                }
		    });
    	}   	
    }
}]);
