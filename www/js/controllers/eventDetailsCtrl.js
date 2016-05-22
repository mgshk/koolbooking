angular.module('eventsApp.controllers.eventDetailsCtrl', [])
    .controller('eventDetailsCtrl', ['$scope', '$state', '$stateParams', 'eventsFactory', '$ionicLoading', '$ionicHistory', function($scope, $state, $stateParams, eventsFactory, $ionicLoading, $ionicHistory) {
    
    if ($stateParams.event_id === "") {
        $state.go('home');
        return;
    }
    
    $scope.noRecords = false;
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

    function showLoder() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="bubbles"></ion-spinner>'
	    });
	}

	function hideLoder(){
	    $ionicLoading.hide();
	}

	showLoder();

    eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
    	hideLoder();

        if (resp.status === 0) {
            $scope.noRecords = true;
        } else {
            $scope.event = resp.data[0];
        }
    });
}]);
