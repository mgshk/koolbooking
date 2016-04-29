angular.module('eventsApp.controllers.forgotPasswordCtrl', [])
	.controller('forgotPasswordCtrl', ['$scope', '$state', 'loginFactory', function($scope, $state, loginFactory) {
            
        $scope.forgetPassword = function() {
            loginFactory.forgotPassword($scope.user_email, $scope.new_password, $scope.confirm_password).then(function (resp) {
                if (resp.status === 0) {
                    $scope.errorMsg = resp.error;
                }

                $state.go('login');
            });
	}

}]);
