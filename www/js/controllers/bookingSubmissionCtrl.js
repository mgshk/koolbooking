angular.module('eventsApp.controllers.bookingSubmissionCtrl', [])
	.controller('bookingSubmissionCtrl', ['$scope', '$stateParams', 'eventsFactory', function($scope, $stateParams, eventsFactory) {
	if ($stateParams.event_id === "") {
        $state.go('home');
    }
	
	$scope.id = $stateParams.event_id;
	
	if($stateParams.adult) {
		$scope.adult = $stateParams.adult;
	} else {
		$scope.adult = 1;
	}
	
	if($stateParams.child) {
		$scope.child = $stateParams.child;
	} else {
		$scope.child = 0;
	}

	if($stateParams.infant) {
		$scope.infant = $stateParams.infant;
	} else {
		$scope.infant = 0;
	}

	eventsFactory.getEventsList().then(function (resp) {
        $scope.eventsList = resp.data;
		
		angular.forEach($scope.eventsList, function(value, key) {
		
			if(value.id === $stateParams.event_id) {
				$scope.adult_price = value.adult_price;
				
				if (angular.isDefined(value.child_price))
					$scope.child_price = value.child_price;
				else
					$scope.child_price = 0;

				if (angular.isDefined(value.infant_price))
					$scope.infant_price = value.infant_price;
				else
					$scope.infant_price = 0;


				$scope.amount = ($scope.adult * $scope.adult_price) + ($scope.child * $scope.child_price) + 
					($scope.infant * $scope.infant_price);

				window.localStorage.setItem('eventID', $scope.id);
				window.localStorage.setItem('adult', $scope.adult);
				window.localStorage.setItem('child', $scope.child);
				window.localStorage.setItem('infant', $scope.infant);
				window.localStorage.setItem('amount', $scope.amount);
			}
		});
    });
}]);
