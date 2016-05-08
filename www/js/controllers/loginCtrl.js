angular.module('eventsApp.controllers.loginCtrl', ['directive.g+signin'])
    .controller('loginCtrl', ['$scope', '$state', '$timeout', '$facebook', 'loginFactory', '$ionicLoading', function($scope, $state, $timeout, $facebook, loginFactory, $ionicLoading) {

    if (window.localStorage.getItem('userID')) {
       $state.go('eventsList');
    }

    $scope.showLoder = function() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="bubbles"></ion-spinner>'
	    });
	 };
	$scope.hideLoder = function(){
	    $ionicLoading.hide();
	};
    
    $scope.login = function() {	
    	$scope.showLoder();
		loginFactory.userLogin ($scope.user_email, $scope.user_pass).then(function (resp) {
			$scope.hideLoder();
		    if (resp.status === 0) {
				$scope.errorMsg = resp.error;
				$scope.user_email = '';
				$scope.user_pass = '';
				$scope.loginForm.$setPristine();
				$scope.loginForm.$setUntouched();
				timeout(); 
				return;
		    }
		    window.localStorage.setItem('userID', resp.data.ID);
		    $state.go('eventsList');
		});
	}
    
    $scope.fbLogin = function() {
		$facebook.login().then(function() {
		    $facebook.api("/me?fields=name,first_name,last_name,email,link").then(function(response) {
				fbLogin(response);
		    });   
		});
    }
    
    function fbLogin (user) {
		if($facebook.isConnected()){	    
		    loginFactory.fbLogin(user).then(function (resp) {
				if (resp.status === 0) {
				    $scope.errorMsg = resp.error;
				    timeout();
				    return;
				}
				
				window.localStorage.setItem('userID', resp.userID);
				$state.go('eventsList');
		    });
		}
    }
    
    $scope.$on('event:google-plus-signin-success', function (event, authResult) {	
		if (angular.isUndefined(authResult.hg.access_token)) {
		    $scope.errorMsg = 'Please check your login credentials';
		    timeout();
		    return;
		}
		
		var access_token = authResult.hg.access_token;
		loginFactory.googleUserInfo(access_token).then(function (resp) {
		    $scope.user = {
				'first_name': resp.given_name,
				'last_name': resp.family_name,
				'name': resp.name,
				'link': resp.link,
				'email': resp.email
		    };

		    googleLogin($scope.user);
		});
    });
    
    function googleLogin (user) {
		loginFactory.googleLogin(user).then(function (resp) {
		    if (resp.status === 0) {
				$scope.errorMsg = resp.error;
				timeout();
				return;
		    }
		    
		    window.localStorage.setItem('userID', resp.userID);
		    $state.go('eventsList');
		});
    }

    function timeout() {
    	$timeout(function() {
	        $scope.errorMsg = '';
	    }, 3000);
    }
}]);
