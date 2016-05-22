angular.module('eventsApp.controllers.yourBookingCtrl', [])
	.controller('yourBookingCtrl', ['$scope', '$state', '$stateParams', 'eventsFactory', '$ionicLoading', '$ionicHistory', function($scope, $state, $stateParams, eventsFactory, $ionicLoading, $ionicHistory) {
	
	if ($stateParams.event_id === "") {
        $state.go('home');
    }

    $scope.logout = function(){
        window.localStorage.removeItem('userID');
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $state.go('login');
    }

    if(window.localStorage.getItem('userID') == null){
        $scope.isUserID = false;
    } else {
        $scope.isUserID = true;
    }

    $scope.no_infant = 0;
    $scope.no_child = 0

    function showLoader() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="bubbles"></ion-spinner>'
	    });
	}

	function hideLoader(){
	    $ionicLoading.hide();
	}

	showLoader();
	
	$scope.id = $stateParams.event_id;
    
    eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
    	hideLoader();
        $scope.event = resp.data[0];
    });
}]);
