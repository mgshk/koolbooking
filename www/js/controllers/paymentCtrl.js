angular.module('eventsApp.controllers.paymentCtrl', [])
	.controller('paymentCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', '$ionicHistory', 'eventsFactory', 'userService',
		function($scope, $stateParams, $state, $ionicLoading, $ionicHistory, eventsFactory, userService) {

		if (!$stateParams.event_id === "") {
	        $state.go('eventsList');
	        return;
	    }

	    $scope.id = $stateParams.event_id;
	    $scope.type = $stateParams.type;

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

		$scope.logout = function(){
	        window.localStorage.removeItem('userID');
	        $ionicHistory.clearCache();
	        $ionicHistory.clearHistory();
	        $state.go('login');
    	}

    	if(window.localStorage.getItem('userID') == null){
        	$scope.isUserID = false;
	    }else{
	        $scope.isUserID = true;
	    }

		$scope.paypalpayment = false;
		$scope.cardspayment = false;

		$scope.checkPaypal = function(){
			$scope.cardspayment = false;
		}

		$scope.checkCards = function(){
			$scope.paypalpayment = false;
		}

		function showLoder() {
		    $ionicLoading.show({
		      template: '<ion-spinner icon="bubbles"></ion-spinner>'
		    });
		};

		function hideLoder() {
		    $ionicLoading.hide();
		};

		showLoder();

		var event_details;

		eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
	    	hideLoder();
	        event_details = resp.data[0];
	    });

	    if ($stateParams.type === 'event') {
			eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
		    	hideLoder();
	        	event_details = resp.data[0];
		    });
		} else {
			eventsFactory.getActivityDetails($stateParams.event_id).then(function (resp) {
		    	hideLoder();
	        	event_details = resp.data[0];
		    });
		}

		$scope.addBooking = function() {
			showLoder();

			var booking_info = {
				'item_id': $scope.id,
				'adult_price': angular.isDefined(event_details.adult_price) ? ($scope.adult * event_details.adult_price) : 0,
				'child_price': angular.isDefined(event_details.child_price) ? ($scope.child * event_details.child_price) : 0,
				'infant_price': angular.isDefined(event_details.infant_price) ? ($scope.infant * event_details.infant_price) : 0,
				'adult_number': $scope.adult,
				'child_number': $scope.child,
				'infant_number': $scope.infant,
				'type_price': event_details.calendar_type_price,
				'check_in': event_details.event_date,
				'ori_price': $scope.amount,
				'total_price': $scope.amount
			};

			userService.addBooking(booking_info).then(function (resp) {
		    	hideLoder();
		    });
		}

}]);
