angular.module('eventsApp.controllers.eventsListCtrl', [])
	.controller('eventsListCtrl', ['$scope', '$state', 'eventsFactory', 'userFactory','$ionicHistory', '$sce', function($scope, $state, eventsFactory, userFactory, $ionicHistory, $sce) {
	
	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}

	$scope.logout = function(){
		window.localStorage.removeItem('userID');
	    $ionicHistory.clearCache();
	    $ionicHistory.clearHistory();
	    $state.go('login');
	}

	if (window.localStorage.getItem('userID') == null){
        $scope.isUserID = false;
        $scope.isLogin = true;
    } else {
        $scope.isUserID = true;
        $scope.isLogin = false;
    }
	
	if (window.localStorage.getItem('userID')) {
		userFactory.getUserDetails(window.localStorage.getItem('userID')).then(function (resp) {
			$scope.userInfo = resp.data;
		});
    }

}]);
