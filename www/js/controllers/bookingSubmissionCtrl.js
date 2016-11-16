angular.module('eventsApp.controllers.bookingSubmissionCtrl', [])
	.controller('bookingSubmissionCtrl', ['$scope','$state', '$stateParams', 'eventsFactory','$ionicLoading','$ionicHistory', function($scope, $state, $stateParams, eventsFactory, $ionicLoading, $ionicHistory) {
	
	if ($stateParams.event_id === "") {
        $state.go('home');
        return;
    }

    $scope.id = $stateParams.event_id;
    $scope.type = $stateParams.type;

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
	
	$scope.id = $stateParams.event_id;

	function showLoder() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="circles"></ion-spinaQSW3ner>'
	    });
	}

	function hideLoder() {
	    $ionicLoading.hide();
	};

	showLoder();
	
	if($stateParams.adult) {
		$scope.adult = $stateParams.adult;
	} else {
		$scope.adult = 1;
	}
	
	if($stateParams.child) {
		$scope.child = $stateParams.child;
	} else {
		$scope.child = 0;
	}

	if($stateParams.infant) {
		$scope.infant = $stateParams.infant;
	} else {
		$scope.infant = 0;
	}

	if ($stateParams.type === 'event') {
		eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
	    	setLocalStorage(resp);
	    });
	} else {
		eventsFactory.getActivityDetails($stateParams.event_id).then(function (resp) {
	    	setLocalStorage(resp);
	    });
	}

	function setLocalStorage (resp) {
		hideLoder();
		$scope.adult_price = resp.data[0].adult_price;
					
		if (angular.isDefined(resp.data[0].child_price))
			$scope.child_price = resp.data[0].child_price;
		else
			$scope.child_price = 0;

		if (angular.isDefined(resp.data[0].infant_price))
			$scope.infant_price = resp.data[0].infant_price;
		else
			$scope.infant_price = 0;


		$scope.amount = ($scope.adult * $scope.adult_price) + ($scope.child * $scope.child_price) + 
			($scope.infant * $scope.infant_price);
		
		window.localStorage.setItem('eventID', $scope.id);
		window.localStorage.setItem('adult', $scope.adult);
		window.localStorage.setItem('child', $scope.child);
		window.localStorage.setItem('infant', $scope.infant);
		window.localStorage.setItem('amount', $scope.amount);
	}
}]);
