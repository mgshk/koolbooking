angular.module('eventsApp.controllers.allCtrl', [])
	.controller('allCtrl', ['$scope', '$filter', '$q', '$ionicLoading', 'eventsFactory', '$ionicPopup', function($scope, $filter, $q, $ionicLoading, eventsFactory, $ionicPopup) {

	$scope.noRecords = false;
	$scope.searchTxt = '0';

	function showLoder() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="circles"></ion-spinner>'
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
		$scope.address = [];

		if (resp.events.status === 0 && resp.activities.status === 0) {
			$scope.noRecords = true;
		} else {
			angular.forEach(resp.events.data, function(value) {
				if(angular.isDefined(value.adult_price)) {
					$scope.eventsList.push(value);

					if ($scope.address.indexOf(value.address) == -1) {
						$scope.address.push(value.address);
					}
				}
			});

			angular.forEach(resp.activities.data, function(value) {
				if(angular.isDefined(value.adult_price)) {
					$scope.activitiesList.push(value);
					
					if ($scope.address.indexOf(value.address) == -1) {
						$scope.address.push(value.address);
					}
				}
			});

			if($scope.eventsList.length === 0 && $scope.activitiesList.length === 0) {
				$scope.noRecords = true;
			}
		}

		hideLoder();
	});

	// An alert dialog
 	function showAlert(msg) {
	    $ionicPopup.alert({
	      title: 'Error',
	      content: msg
	    }).then(function(res) {
	      console.log('Search Failed');
	    });
    };

	$scope.filterEventsActivities = function() {
		var start_date = $scope.start_date;
		var end_date = $scope.end_date;
		var address = $scope.searchTxt;

        var startDate = angular.isDefined(start_date) ? $filter('date')(start_date, "yyyy-MM-dd") : null;
        var endDate = angular.isDefined(end_date) ? $filter('date')(end_date, "yyyy-MM-dd") : null;
        
		try {
			if (startDate === null)
				throw "Enter Start date";

			if (!angular.isDefined(address))
				throw "Enter location";

			if (angular.isDefined(endDate) && endDate < startDate)
				throw "End date should be greater than Start date";

			showLoder();
			$scope.noRecords = false;

			$q.all({
				events: eventsFactory.getFilterEvents(address, startDate, endDate),
				activities: eventsFactory.getFilterActivities(address, startDate, endDate)
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
				}

				hideLoder();
			});
		} catch (e) {
			showAlert(e);
			return;
		}
    }
}]);
