angular.module('eventsApp.controllers.signupCtrl', [])
	.controller('signupCtrl', ['$scope', '$state', '$timeout', 'loginFactory', '$ionicLoading', function($scope, $state, $timeout, loginFactory, $ionicLoading) {

	$scope.showLoder = function() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="bubbles"></ion-spinner>'
	    });
	};

	$scope.hideLoder = function(){
	    $ionicLoading.hide();
	};
     
    $scope.signUp = function() {
    	$scope.showLoder();
        loginFactory.signUp($scope.user).then(function (resp) {
        	$scope.hideLoder();
            if (resp.status === 0) {
                $scope.errorMsg = resp.error;
                timeout();
                return;
            }

            window.localStorage.setItem('userID', resp.userID);
	   		$state.go('eventsList');
        });
	}

	function timeout() {
    	$timeout(function() {
	        $scope.errorMsg = '';
	    }, 3000);
    }

}]);
