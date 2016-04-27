angular.module('eventsApp.controllers.loginCtrl', ['directive.g+signin'])
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
    
    $scope.$on('event:google-plus-signin-success', function (event, authResult) {	
	if (angular.isUndefined(authResult.hg.access_token)) {
	    $scope.errorMsg = 'Please check your login credentials';
	    return;
	}
	
	var access_token = authResult.hg.access_token;
	loginFactory.googleLogin(access_token).then(function (resp) {
	    if (resp.status === 0) {
		$scope.errorMsg = resp.error;
		return;
	    }
	    
	    //window.localStorage.setItem('userID', resp.userID);
	    window.localStorage.setItem('userID', 12);
	    $state.go('eventsList');
	});
    });
    
    function fbLogin (auth_token) {
	if($facebook.isConnected()){	    
	    loginFactory.fbLogin(auth_token).then(function (resp) {
		if (resp.status === 0) {
		    $scope.errorMsg = resp.error;
		    return;
		}
		
		//window.localStorage.setItem('userID', resp.userID);
		window.localStorage.setItem('userID', 12);
		$state.go('eventsList');
	    });
	}
    }
}]);
