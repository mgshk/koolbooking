angular.module('eventsApp.controllers.bookingSubmissionCtrl', [])
	.controller('bookingSubmissionCtrl', ['$scope','$state', '$stateParams', '$ionicLoading','$ionicHistory', function($scope, $state, $stateParams, $ionicLoading, $ionicHistory) {
	
	function showLoader() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="circles"></ion-spinner>'
	    });
	}

	function hideLoader() {
	    $ionicLoading.hide();
	}

	showLoader();

	$scope.adult = angular.isDefined($stateParams.adult) ? $stateParams.adult : 1;
	$scope.child = angular.isDefined($stateParams.child) ? $stateParams.child : 0;
	$scope.infant = angular.isDefined($stateParams.infant) ? $stateParams.infant : 0;

	if(window.localStorage.getItem('event_details')) {
        hideLoader();
        var event_details = JSON.parse(window.localStorage.getItem('event_details'));

        $scope.event_name = event_details.name;
        $scope.event_date = event_details.event_date;
        $scope.adult_price = event_details.adult_price;
        $scope.child_price = angular.isDefined(event_details.child_price) ? event_details.child_price : 0;
        $scope.infant_price = angular.isDefined(event_details.infant_price) ? event_details.infant_price : 0;

        $scope.amount = ($scope.adult * $scope.adult_price) + ($scope.child * $scope.child_price) + 
			($scope.infant * $scope.infant_price);
		
		window.localStorage.setItem('eventID', event_details.id);
		window.localStorage.setItem('eventName', event_details.name);
		window.localStorage.setItem('adult', $scope.adult);
		window.localStorage.setItem('child', $scope.child);
		window.localStorage.setItem('infant', $scope.infant);
		window.localStorage.setItem('amount', $scope.amount);
    }
}]);
