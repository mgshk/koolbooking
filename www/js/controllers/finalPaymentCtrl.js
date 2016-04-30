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

	$scope.paypalPayment = function() {
    	//userFactory.paypalPayment($scope.user);
    	return $http.post('/paypal/form.php', {'user_details' : user_details}).success(function (data) {
    		console.log(data);
    	});
	}
}]);
