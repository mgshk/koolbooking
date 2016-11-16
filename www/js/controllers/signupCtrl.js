angular.module('eventsApp.controllers.signupCtrl', [])
	.controller('signupCtrl', ['$scope', '$state', 'loginFactory', '$ionicLoading', '$ionicPopup', function($scope, $state, loginFactory, $ionicLoading, $ionicPopup) {

	var errorMsg;

	$scope.showLoder = function() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="circles"></ion-spinner>'
	    });
	};

	$scope.hideLoder = function(){
	    $ionicLoading.hide();
	};

	// An alert dialog
 	$scope.showAlert = function() {
	    $ionicPopup.alert({
	      title: 'Signup',
	      content: errorMsg
	    }).then(function(res) {
	      console.log('Login Failed');
	    });
    };
     
    $scope.signUp = function() {
    	$scope.showLoder();
        loginFactory.signUp($scope.user).then(function (resp) {
        	$scope.hideLoder();
            if (resp.status === 0) {
                errorMsg = resp.error;
                $scope.showAlert();
                $scope.user = {};
				$scope.signupForm.$setPristine();
				$scope.signupForm.$setUntouched();
                return;
            }

            window.localStorage.setItem('userID', resp.userID);
	   		$state.go('eventsList');
        });
	}

}]);
