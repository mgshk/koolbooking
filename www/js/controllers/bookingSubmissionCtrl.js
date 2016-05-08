angular.module('eventsApp.controllers.bookingSubmissionCtrl', [])
	.controller('bookingSubmissionCtrl', ['$scope','$state', '$stateParams', 'eventsFactory','$ionicLoading','$ionicHistory', function($scope, $state, $stateParams, eventsFactory, $ionicLoading, $ionicHistory) {
	
	if ($stateParams.event_id === "") {
        $state.go('home');
    }

    $scope.logout = function(){
        window.localStorage.removeItem('userID');
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $state.go('login');
    }
	
	$scope.id = $stateParams.event_id;

	$scope.showLoder = function() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="bubbles"></ion-spinner>'
	    });
	 };
	$scope.hideLoder = function(){
	    $ionicLoading.hide();
	};

	$scope.showLoder();
	
	if($stateParams.adult) {
		$scope.adult = $stateParams.adult;
	} else {
		$scope.adult = 1;
	}
	
	if($stateParams.child) {
		$scope.child = $stateParams.child;
	} else {
		$scope.child = 1;
	}
	
	eventsFactory.getEventsList().then(function (resp) {

		$scope.hideLoder();
        $scope.eventsList = resp.data;
		
		angular.forEach($scope.eventsList, function(value, key) {
		
			if(value.id === $stateParams.event_id) {
				$scope.adult_price = value.adult_price;
				
				if (angular.isDefined(value.child_price))
					$scope.child_price = value.child_price;
				else
					$scope.child_price = 0;
			}
		});
    });
}]);
