angular.module('eventsApp.controllers.activityDetailsCtrl', [])
    .controller('activityDetailsCtrl', ['$scope', '$state', '$stateParams', 'eventsFactory', '$ionicLoading', '$ionicHistory', function($scope, $state, $stateParams, eventsFactory, $ionicLoading, $ionicHistory) {
    
    if ($stateParams.activity_id === "") {
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

    eventsFactory.getActivityDetails($stateParams.activity_id).then(function (resp) {
    	hideLoder();

        if (resp.status === 0) {
            $scope.noRecords = true;
        } else {
            $scope.activity = resp.data[0];
        }
    });
}]);
