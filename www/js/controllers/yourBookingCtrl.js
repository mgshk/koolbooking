angular.module('eventsApp.controllers.yourBookingCtrl', [])
	.controller('yourBookingCtrl', ['$scope', '$state', '$ionicLoading', '$ionicHistory', function($scope, $state, $ionicLoading, $ionicHistory) {
	
	$scope.logout = function(){
        window.localStorage.removeItem('userID');
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $state.go('login');
    }

    $scope.no_infant = 0;
    $scope.no_child = 0;

    function showLoader() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="circles"></ion-spinner>'
	    });
	}

	function hideLoader(){
	    $ionicLoading.hide();
	}

	showLoader();
	
    if(window.localStorage.getItem('event_details')) {
        hideLoader();
        $scope.event = JSON.parse(window.localStorage.getItem('event_details'));
    }
}]);
