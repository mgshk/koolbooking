angular.module('eventsApp.controllers.activityCtrl', [])
	.controller('activityCtrl', ['$scope', '$filter', 'eventsFactory', function($scope, $filter, eventsFactory) {

    $scope.noRecords = false;

	getActivities();

    $scope.filterActivities = function(start_date, end_date, address) {

        var startDate = $filter('date')(start_date, "yyyy-MM-dd");
        var endDate = null;

        if(angular.isDefined(end_date))
            endDate = $filter('date')(end_date, "yyyy-MM-dd");

        if ((angular.isDefined(address) || address !== '') && angular.isDefined(start_date)) {
    		eventsFactory.getFilterActivities(address, startDate, endDate).then(function (resp) {
                if(resp.status === 0) {
                    $scope.noRecords = true;
                } else {
                    $scope.noRecords = false;
                    $scope.activitiesList = resp.data;
                } 
		    });
    	} else {
    		getActivities();
    	}   	
    }

    function getActivities () {
    	eventsFactory.getActivitiesList().then(function (resp) {
	        if(resp.status === 0) {
                $scope.noRecords = true;
            } else {
                $scope.noRecords = false;
                $scope.activitiesList = resp.data;
            }
	    });
    }
}]);

