angular.module('eventsApp.controllers.forgotPasswordCtrl', [])
	.controller('forgotPasswordCtrl', ['$scope', '$state', '$ionicLoading', 'loginFactory','$ionicPopup', function($scope, $state, $ionicLoading, loginFactory, $ionicPopup) {
    
    var errorMsg;

    $scope.showLoder = function() {
        $ionicLoading.show({
          template: '<ion-spinner icon="bubbles"></ion-spinner>'
        });
    };

    $scope.hideLoder = function(){
        $ionicLoading.hide();
    };

    $scope.showAlert = function() {
        $ionicPopup.alert({
          title: 'Forgot Password',
          content: errorMsg
        }).then(function(res) {
          console.log('Password not match');
        });
    };

    $scope.forgetPassword = function() {
        $scope.showLoder();

    	if($scope.new_password !== $scope.confirm_password) {
            $scope.hideLoder();
    		errorMsg = 'New and Confirm password are mismatch';
            $scope.showAlert();
            $scope.user_email = '';
            $scope.new_password = '';
            $scope.confirm_password = '';
            $scope.forgotPasswordForm.$setPristine();
            $scope.forgotPasswordForm.$setUntouched();
            return;
    	}

        loginFactory.forgotPassword($scope.user_email, $scope.new_password, $scope.confirm_password).then(function (resp) {
            $scope.hideLoder();

            if (resp.status === 0) {
                errorMsg = resp.error;
                $scope.showAlert();
                $scope.user_email = '';
                $scope.new_password = '';
                $scope.confirm_password = '';
                $scope.forgotPasswordForm.$setPristine();
                $scope.forgotPasswordForm.$setUntouched();
                return;
            }

            $state.go('login');
        });
	}

}]);
