angular.module('eventsApp.controllers.allCtrl', [])
	.controller('allCtrl', ['$scope', '$filter', '$q', '$ionicLoading', 'eventsFactory', function($scope, $filter, $q, $ionicLoading, eventsFactory) {

	$scope.noRecords = false;

	function showLoder() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="bubbles"></ion-spinner>'
	    });
	}

	function hideLoder(){
	    $ionicLoading.hide();
	}

	showLoder();

	$q.all({
		events: eventsFactory.getEventsList(),
		activities: eventsFactory.getActivitiesList()
	}).then(function(resp) {
		$scope.eventsList = [];
		$scope.activitiesList = [];

		if (resp.events.status === 0 && resp.activities.status === 0) {
			$scope.noRecords = true;
		} else {
			angular.forEach(resp.events.data, function(value) {
				if(angular.isDefined(value.adult_price)) {
					$scope.eventsList.push(value);
				}
			});

			angular.forEach(resp.activities.data, function(value) {
				if(angular.isDefined(value.adult_price)) {
					$scope.activitiesList.push(value);
				}
			});

			if($scope.eventsList.length === 0 && $scope.activitiesList.length === 0) {
				$scope.noRecords = true;
			}

			hideLoder();
		}
	});

	$scope.filterEvents = function(start_date, end_date, address) {

        var startDate = $filter('date')(start_date, "yyyy-MM-dd");
        var endDate = null;

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
