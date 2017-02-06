angular.module('eventsApp.controllers.homeCtrl', [])
	.controller('homeCtrl', ['$scope', '$state', 'eventsFactory', 'userFactory', '$cordovaOauth', 'loginFactory', function($scope, $state, eventsFactory, userFactory, $cordovaOauth, loginFactory) {
	
    if(window.localStorage.getItem('userID')) {
		$scope.showYouTab = true;

		userFactory.getUserDetails(window.localStorage.getItem('userID')).then(function (resp) {
			$scope.userDetails = resp.data;
		});
	}

	eventsFactory.getEventsList().then(function (resp) {
        $scope.eventsList = resp.data;
    });
    
    eventsFactory.getFeaturedEvents().then(function (resp) {
        $scope.featuredEvents = resp.data;
    });
    
    eventsFactory.getTopDealsEvents().then(function (resp) {
        $scope.topDealsEvents = resp.data;
    });

    eventsFactory.getVideoUrl().then(function (resp) {
    	$scope.videoUrls = resp.app_youtube_url;
    });

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
                return;
            }
            
            window.localStorage.setItem('userID', resp.userID);
            $state.go('eventsList');
        });
    }
}]);
