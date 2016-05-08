angular.module('eventsApp.controllers.yourBookingCtrl', [])
	.controller('yourBookingCtrl', ['$scope', '$state', '$stateParams', 'eventsFactory','$ionicLoading','$ionicHistory', function($scope, $state, $stateParams, eventsFactory, $ionicLoading, $ionicHistory) {
	
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
    }else{
        $scope.isUserID = true;
    }

    $scope.showLoder = function() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="bubbles"></ion-spinner>'
	    });
	 };
	$scope.hideLoder = function(){
	    $ionicLoading.hide();
	};

	$scope.showLoder();
	
	$scope.id = $stateParams.event_id;
    
    eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
    	$scope.hideLoder();
        $scope.event = resp.data;

        eventsFactory.getEventsList().then(function (resp) {
        	angular.forEach(resp.data, function(value, key) {
			
				if(value.id === $stateParams.event_id) {
					angular.extend($scope.event, value);
				}
			});
        });
    });
}]);
