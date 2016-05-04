angular.module('eventsApp.controllers.bookingSubmissionCtrl', [])
	.controller('bookingSubmissionCtrl', ['$scope', '$stateParams', 'eventsFactory', function($scope, $stateParams, eventsFactory) {
	if ($stateParams.event_id === "") {
        $state.go('home');
    }
	
	$scope.id = $stateParams.event_id;
	
	eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
        $scope.event = resp.data; console.log($scope.event);
    });
}]);
