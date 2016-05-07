angular.module('eventsApp.controllers.yourBookingCtrl', [])
	.controller('yourBookingCtrl', ['$scope', '$state', '$stateParams', 'eventsFactory', function($scope, $state, $stateParams, eventsFactory) {
	if ($stateParams.event_id === "") {
        $state.go('home');
    }
	
	$scope.id = $stateParams.event_id;
    
    eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
        $scope.event = resp.data;

        eventsFactory.getEventsList().then(function (resp) {
        	angular.forEach(resp.data, function(value, key) {
			
				if(value.id === $stateParams.event_id) {
					angular.extend($scope.event, value);
				}
			});
        });
    });
}]);
