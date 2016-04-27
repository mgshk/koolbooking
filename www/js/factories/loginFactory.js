angular.module('eventsApp.factory.loginFactory', [])
	.factory('loginFactory', ['$q', 'loginService', function($q, loginService) {
	
	return {
		userLogin: userLogin,
		forgotPassword: forgotPassword,
		signUp: signUp,
		fbLogin: fbLogin
	};
	
	function userLogin (user_email, user_pass) {
		var deferred = $q.defer();
		loginService.userLogin(user_email, user_pass).then(function (resp) {
			deferred.resolve(resp.data);
		}, function(error) {
			console.log(error);
		});
		return deferred.promise;
	}
	
	function forgotPassword (user_email) {
		var deferred = $q.defer();
		loginService.forgotPassword(user_email).then(function (resp) {
			deferred.resolve(resp.data);
		}, function(error) {
			console.log(error);
		});
		return deferred.promise;
	}
	
	function signUp (user) {
		var deferred = $q.defer();
		loginService.signUp(user).then(function (resp) {
			deferred.resolve(resp.data);
		}, function(error) {
			console.log(error);
		});
		return deferred.promise;
	}
	
	function fbLogin (access_token) {
		var deferred = $q.defer();
		loginService.fbLogin(access_token).then(function (resp) {
			deferred.resolve(resp.data);
		}, function(error) {
			console.log(error);
		});
		return deferred.promise;
	}
	
	function googleLogin (access_token) {
		var deferred = $q.defer();
		loginService.googleLogin(access_token).then(function (resp) {
			deferred.resolve(resp.data);
		}, function(error) {
			console.log(error);
		});
		return deferred.promise;
	}
}]);
