angular.module('eventsApp.controllers.yourBookingCtrl', [])
	.controller('yourBookingCtrl', ['$scope', '$state', '$stateParams', 'eventsFactory', function($scope, $state, $stateParams, eventsFactory) {
	if ($stateParams.event_id === "") {
        $state.go('home');
    }
	
	$scope.id = $stateParams.event_id;
    
    eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
        $scope.event = resp.data;
    });
}]);
