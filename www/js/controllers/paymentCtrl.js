angular.module('eventsApp.controllers.paymentCtrl', [])
	.controller('paymentCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', '$ionicHistory', 'eventsFactory', 'userService',
		function($scope, $stateParams, $state, $ionicLoading, $ionicHistory, eventsFactory, userService) {

		if (!window.localStorage.getItem('event_details')) {
	        $state.go('eventsList');
	        return;
	    }

	    $scope.amount = angular.isDefined(window.localStorage.getItem('amount')) ? window.localStorage.getItem('amount') : 0

		function showLoader() {
		    $ionicLoading.show({
		      template: '<ion-spinner icon="circles"></ion-spinner>'
		    });
		};

		function hideLoader() {
		    $ionicLoading.hide();
		};

		showLoader();

		var event_details;

		if(window.localStorage.getItem('event_details')) {
	        hideLoader();
	        event_details = JSON.parse(window.localStorage.getItem('event_details'));
	    }

	    $scope.adult = window.localStorage.getItem('adult');
	    $scope.child = angular.isDefined(window.localStorage.getItem('child')) ? window.localStorage.getItem('child') : 0;
	    $scope.infant = angular.isDefined(window.localStorage.getItem('infant')) ? window.localStorage.getItem('infant') : 0;

		$scope.addBooking = function() {
			showLoader();

			var booking_info = {
				'item_id': event_details.id,
				'adult_price': angular.isDefined(event_details.adult_price) ? ($scope.adult * event_details.adult_price) : 0,
				'child_price': angular.isDefined(event_details.child_price) ? ($scope.child * event_details.child_price) : 0,
				'infant_price': angular.isDefined(event_details.infant_price) ? ($scope.infant * event_details.infant_price) : 0,
				'adult_number': window.localStorage.getItem('adult'),
				'child_number': $scope.child,
				'infant_number': $scope.infant,
				'type_price': event_details.calendar_type_price,
				'check_in': event_details.event_date,
				'ori_price': $scope.amount,
				'total_price': $scope.amount
			};

			userService.addBooking(booking_info).then(function (resp) {
		    	hideLoader();
		    });
		}
}]);
