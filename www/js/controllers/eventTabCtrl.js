angular.module('eventsApp.controllers.eventTabCtrl', [])
	.controller('eventTabCtrl', ['$scope', '$filter', 'eventsFactory', '$ionicLoading', '$ionicPopup', function($scope, $filter, eventsFactory, $ionicLoading, $ionicPopup) {

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
    
	eventsFactory.getEventsList().then(function (resp) {
        hideLoder();
        $scope.eventsList = [];
        
        if(resp.status === 1) {
            angular.forEach(resp.data, function(value) {
                if(angular.isDefined(value.adult_price)) {
                    $scope.eventsList.push(value);
                }
            });
        }

        if($scope.eventsList.length === 0) {
            $scope.noRecords = true;
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

    $scope.filterEvents = function(start_date, end_date, address) {
        var startDate = angular.isDefined(start_date) ? $filter('date')(start_date, "yyyy-MM-dd") : null;
        var endDate = angular.isDefined(end_date) ? $filter('date')(end_date, "yyyy-MM-dd") : null;
        $scope.noRecords = false;

		try {
			if (startDate === null)
				throw "Enter Start date";

			if (!angular.isDefined(address))
				throw "Enter location";

			if (angular.isDefined(endDate) && endDate < startDate)
				throw "End date should be greater than Start date";

			showLoder();
			$scope.eventsList = [];

			eventsFactory.getFilterEvents(address, startDate, endDate).then(function (resp) {
				hideLoder();

				if(resp.status === 0) {
					$scope.noRecords = true;
				} else {
					angular.forEach(resp.data, function(value) {
						if(angular.isDefined(value.adult_price)) {
							$scope.eventsList.push(value);
						}
					});

					if($scope.eventsList.length === 0) {
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
