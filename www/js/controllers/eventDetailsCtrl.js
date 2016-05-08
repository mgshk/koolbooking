angular.module('eventsApp.controllers.eventDetailsCtrl', [])
    .controller('eventDetailsCtrl', ['$scope', '$state', '$stateParams', 'eventsFactory', '$ionicLoading', '$ionicHistory', function($scope, $state, $stateParams, eventsFactory, $ionicLoading, $ionicHistory) {
    
    if ($stateParams.event_id === "") {
        $state.go('home');
    }
    
    $scope.logout = function(){
        window.localStorage.removeItem('userID');
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $state.go('login');
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

    eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
    	$scope.hideLoder();
        $scope.event = resp.data;
    });
}]);
