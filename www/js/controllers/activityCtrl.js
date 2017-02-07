angular.module('eventsApp.controllers.activityCtrl', [])
	.controller('activityCtrl', ['$scope', '$state', '$filter', 'eventsFactory', '$ionicLoading', '$ionicPopup', function($scope, $state, $filter, eventsFactory, $ionicLoading, $ionicPopup) {
    
    $scope.noRecords = false;

	function showLoder() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="circles"></ion-spinner>'
	    });
	}

	function hideLoder(){
	    $ionicLoading.hide();
	}

	showLoder();

    eventsFactory.getActivitiesList().then(function (resp) {
    	hideLoder();

        $scope.activitiesList = [];
    	if(resp.status === 0){
    		$scope.noRecords = true;
    	} else {
    		angular.forEach(resp.data, function(value) {
				if(angular.isDefined(value.adult_price)) {
					$scope.activitiesList.push(value);
				}
			});

    		if($scope.activitiesList.length === 0){
    			$scope.noRecords = true;
    		}
    	} 
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

    $scope.filterActivities = function(start_date, end_date, address) {
        var startDate = angular.isDefined(start_date) ? $filter('date')(start_date, "yyyy-MM-dd") : null;
        var endDate = angular.isDefined(end_date) ? $filter('date')(end_date, "yyyy-MM-dd") : null;

		try {
			if (startDate === null)
				throw "Enter Start date";

			if (!angular.isDefined(address))
				throw "Enter location";

			if (angular.isDefined(endDate) && endDate < startDate)
				throw "End date should be greater than Start date";
			
			$scope.noRecords = false;
			showLoder();
			$scope.activitiesList = [];

			eventsFactory.getFilterActivities(address, startDate, endDate).then(function (resp) {
				hideLoder();

				if(resp.status === 0) {
					$scope.noRecords = true;
				} else {
					angular.forEach(resp.data, function(value) {
						if(angular.isDefined(value.adult_price)) {
							$scope.activitiesList.push(value);
						}
					});

					if($scope.activitiesList.length === 0) {
						$scope.noRecords = true;
					}
				} 
			});
		} catch (e) {
			showAlert(e);
			return;
		}
    }
}]);
