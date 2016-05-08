angular.module('eventsApp.controllers.settingCtrl', [])
	.controller('settingCtrl', function($scope, $state, $ionicHistory) {
		
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
});
