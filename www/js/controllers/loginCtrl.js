angular.module('eventsApp.controllers.loginCtrl', [])
    .controller('loginCtrl', ['$scope', '$state', '$cordovaOauth', 'loginFactory', '$ionicLoading', '$ionicPopup', '$http', '$ionicModal' , function($scope, $state, $cordovaOauth, loginFactory, $ionicLoading, $ionicPopup, $http, $ionicModal) {

    var errorMsg;

    if (window.localStorage.getItem('userID')) {
       $state.go('eventsList');
    }

    function showLoder() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="circles"></ion-spinner>'
	    });
	 };

	function hideLoder(){
	    $ionicLoading.hide();
	};

	// An alert dialog
 	$scope.showAlert = function() {
	    $ionicPopup.alert({
	      title: 'Login',
	      content: errorMsg
	    }).then(function(res) {
	      console.log('Login Failed');
	    });
    };
    
    $scope.login = function() {	
    	showLoder();
		loginFactory.userLogin ($scope.user_email, $scope.user_pass).then(function (resp) {
			hideLoder();
		    if (resp.status === 0) {
				errorMsg = resp.error;
				$scope.showAlert();
				$scope.user_email = '';
				$scope.user_pass = '';
				$scope.loginForm.$setPristine();
				$scope.loginForm.$setUntouched();
				return;
		    }
		    window.localStorage.setItem('userID', resp.data.ID);
		    $state.go('eventsList');
		});
	}
    
    $scope.fbLogin = function() {
		$cordovaOauth.facebook("1677847679144225", ['email']).then(function(result) {
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: result.access_token, fields: "name,first_name,last_name,email,link", format: "json" }}).then(function(result) {
                var user = {
                	name: result.data.name,
                	first_name: result.data.first_name,
                	last_name: result.data.last_name,
                	email: result.data.email,
                	link: result.data.link
                };

                fbLogin(user);
            }, function(error) {
                alert("There was a problem getting your profile.");
            });
        }, function(error) {
            alert("There was a problem signing in!");
        });
    }

    $scope.googleLogin = function() {
    	$cordovaOauth.google("517332717749-v9vnp2a4oaglirev9uu34nq3gkhqtan4.apps.googleusercontent.com", ["email"]).then(function(result) {
		    var access_token = result.access_token;

		    loginFactory.googleUserInfo(access_token).then(function (resp) {
			    var user = {
					'first_name': resp.given_name,
					'last_name': resp.family_name,
					'name': resp.name,
					'link': resp.link,
					'email': resp.email
			    };
			    
			    googleLogin(user);
			});
		}, function(error) {
		    alert("There was a problem signing in!");
		});
    } 
    
    function fbLogin (user) {
		loginFactory.fbLogin(user).then(function (resp) {
			if (resp.status === 0) {
			    errorMsg = resp.error;
			    $scope.showAlert();
			    return;
			}
			
			window.localStorage.setItem('userID', resp.userID);
			$state.go('eventsList');
	    });
    }
    
    function googleLogin (user) {
		loginFactory.googleLogin(user).then(function (resp) {
		    if (resp.status === 0) {
				errorMsg = resp.error;
				$scope.showAlert();
				return;
		    }
		    
		    window.localStorage.setItem('userID', resp.userID);
		    $state.go('eventsList');
		});
    }

    $ionicModal.fromTemplateUrl('terms.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	}).then(function(modal) {
	    $scope.modal = modal;
	});

	$scope.openModal = function() {
	    $scope.modal.show();
	};

	$scope.closeModal = function() {
	    $scope.modal.hide();
	};

}]);
