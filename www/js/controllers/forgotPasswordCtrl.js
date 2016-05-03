angular.module('eventsApp.controllers.forgotPasswordCtrl', [])
	.controller('forgotPasswordCtrl', ['$scope', '$state', '$timeout', 'loginFactory', function($scope, $state, $timeout, loginFactory) {
 
    $scope.forgetPassword = function() {

    	if($scope.new_password !== $scope.confirm_password) {
    		$scope.errorMsg = 'New and Confirm password are mismatch';
    		timeout();
            return;
    	}

        loginFactory.forgotPassword($scope.user_email, $scope.new_password, $scope.confirm_password).then(function (resp) {
            if (resp.status === 0) {
                $scope.errorMsg = resp.error;
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
