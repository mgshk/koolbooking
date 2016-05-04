angular.module('eventsApp.controllers.yourBookingCtrl', [])
	.controller('yourBookingCtrl', ['$scope', '$state', '$stateParams', 'eventsFactory', function($scope, $state, $stateParams, eventsFactory) {
	if ($stateParams.event_id === "") {
        $state.go('home');
    }
	
	$scope.id = $stateParams.event_id;
    
    eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
        $scope.event = resp.data;
    });
	
	eventsFactory.getEventsList().then(function (resp) {
        $scope.eventsList = resp.data;
		
		angular.forEach($scope.eventsList, function(value, key) {
		
			if(value.id === $stateParams.event_id) {
				if (angular.isDefined(value.child_price))
					$scope.showChild = true;
			}
		});
    });
}]);
