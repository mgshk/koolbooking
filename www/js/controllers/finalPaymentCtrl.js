angular.module('eventsApp.controllers.finalPaymentCtrl', [])
	.controller('finalPaymentCtrl', ['$scope', '$state', '$stateParams', 'eventsFactory', 'userFactory', function($scope, $state, $stateParams, eventsFactory, userFactory) {
	
	if ($stateParams.event_id === "") {
        $state.go('home');
    }

    eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
        $scope.event = resp.data;
    });

    $scope.cardPayment = function() {
    	userFactory.cardPayment($scope.card);
	}
}]);
