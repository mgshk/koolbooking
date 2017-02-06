angular.module('eventsApp.controllers.signupCtrl', [])
	.controller('signupCtrl', ['$scope', '$state', 'loginFactory', '$ionicLoading', '$ionicPopup', function($scope, $state, loginFactory, $ionicLoading, $ionicPopup) {

	var regMsg;

	function showLoader() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="circles"></ion-spinner>'
	    });
	}

	function hideLoader() {
	    $ionicLoading.hide();
	}

	// An alert dialog
 	function showAlert() {
	    $ionicPopup.alert({
	      title: 'Signup',
	      content: regMsg
	    }).then(function(res) {
	      console.log('Login Failed');
	    });
    }
     
    $scope.signUp = function() {
    	showLoader();

        loginFactory.signUp($scope.user).then(function (resp) {
        	hideLoader();

            if (resp.status === 0) {
                regMsg = resp.error;
                showAlert();

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
