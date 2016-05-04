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
		$scope.child = 1;
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
			}
		});
    });
	
	/*eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
        $scope.event = resp.data;
    });*/
}]);
