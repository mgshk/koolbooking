angular.module('eventsApp.controllers.signupCtrl', [])
	.controller('signupCtrl', ['$scope', 'loginFactory', function($scope, loginFactory) {
          
        $scope.signUp = function() {
            loginFactory.signUp($scope.user).then(function (resp) {
                if (resp.status === 0) {
                    $scope.errorMsg = resp.error;
                }
            });
	}

}]);
