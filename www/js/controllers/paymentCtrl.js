angular.module('eventsApp.controllers.paymentCtrl', [])
	.controller('paymentCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {

		if (!$stateParams.event_id === "") {
	        $state.go('eventsList');
	    }

	    $scope.id = $stateParams.event_id;

		if(window.localStorage.getItem('adult')) {
			$scope.adult = window.localStorage.getItem('adult');
		} else {
			$scope.adult = 0;
		}

		if(window.localStorage.getItem('child')) {
			$scope.child = window.localStorage.getItem('child');
		} else {
			$scope.child = 0;
		}

		if(window.localStorage.getItem('infant')) {
			$scope.infant = window.localStorage.getItem('infant');
		} else {
			$scope.infant = 0;
		}

		if(window.localStorage.getItem('amount')) {
			$scope.amount = window.localStorage.getItem('amount');
		} else {
			$scope.amount = 0;
		}

}]);
