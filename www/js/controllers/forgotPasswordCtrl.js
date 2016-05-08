angular.module('eventsApp.controllers.forgotPasswordCtrl', [])
	.controller('forgotPasswordCtrl', ['$scope', '$state', '$timeout', '$ionicLoading', 'loginFactory', function($scope, $state, $timeout, $ionicLoading, loginFactory) {
 
    $scope.showLoder = function() {
        $ionicLoading.show({
          template: '<ion-spinner icon="bubbles"></ion-spinner>'
        });
    };

    $scope.hideLoder = function(){
        $ionicLoading.hide();
    };

    $scope.forgetPassword = function() {
        $scope.showLoder();

    	if($scope.new_password !== $scope.confirm_password) {
            $scope.hideLoder();
    		$scope.errorMsg = 'New and Confirm password are mismatch';
            $scope.user_email = '';
            $scope.new_password = '';
            $scope.confirm_password = '';
            $scope.forgotPasswordForm.$setPristine();
            $scope.forgotPasswordForm.$setUntouched();
    		timeout();
            return;
    	}

        loginFactory.forgotPassword($scope.user_email, $scope.new_password, $scope.confirm_password).then(function (resp) {
            $scope.hideLoder();

            if (resp.status === 0) {
                $scope.errorMsg = resp.error;
                $scope.user_email = '';
                $scope.new_password = '';
                $scope.confirm_password = '';
                $scope.forgotPasswordForm.$setPristine();
                $scope.forgotPasswordForm.$setUntouched();
                timeout();
                return;
            }

            $state.go('login');
        });
	}

	function timeout() {
    	$timeout(function() {
	        $scope.errorMsg = '';
	    }, 3000);
    }

}]);
