angular.module('eventsApp.controllers.loginCtrl', [])
	.controller('loginCtrl', ['$scope', 'loginFactory', function($scope, loginFactory) {
	
	$scope.login = function() {
            
            loginFactory.userLogin($scope.user_email, $scope.user_pass).then(function (resp) {
                if (resp.status === 0) {
                    $scope.errorMsg = resp.error;
                    return;
                }
            });
	}
}]);
