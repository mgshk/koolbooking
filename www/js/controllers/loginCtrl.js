angular.module('eventsApp.controllers.loginCtrl', [])
    .controller('loginCtrl', ['$scope', '$state', '$facebook', 'loginFactory', function($scope, $state, $facebook, loginFactory) {
    
    $scope.login = function() {
	
	loginFactory.userLogin ($scope.user_email, $scope.user_pass).then(function (resp) {
	    if (resp.status === 0) {
		$scope.errorMsg = resp.error;
		return;
	    }
	    
	    window.localStorage.setItem('userID', resp.data.ID);
	    $state.go('eventsList');
	});
    }
    
    $scope.fbLogin = function() {
	$facebook.login().then(function(response) {
	    var auth_token = response.authResponse.accessToken;
	    fbLogin(auth_token);
	});
    }
    
    function fbLogin (auth_token) {
	console.log(auth_token);
	/*if($facebook.isConnected()){	    
	    loginFactory.fbLogin(auth_token).then(function (resp) {
		if (resp.status === 0) {
		    $scope.errorMsg = resp.error;
		    return;
		}
		
		window.localStorage.setItem('userID', resp.userID);
		$state.go('eventsList');
	    });
	}*/
    }
}]);
