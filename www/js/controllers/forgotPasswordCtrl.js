angular.module('eventsApp.controllers.forgotPasswordCtrl', [])
	.controller('forgotPasswordCtrl', ['$scope', 'loginFactory', function($scope, loginFactory) {
            
        $scope.forgetPassword = function() {
            loginFactory.forgotPassword($scope.user_email).then(function (resp) {
                if (resp.status === 0) {
                    $scope.errorMsg = resp.error;
                }
            });
	}

}]);
