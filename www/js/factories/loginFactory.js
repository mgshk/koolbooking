angular.module('eventsApp.factory.loginFactory', [])
	.factory('loginFactory', ['$q', 'loginService', function($q, loginService) {
	
	return {
		userLogin: userLogin,
		forgotPassword: forgotPassword,
		signUp: signUp,
		fbLogin: fbLogin,
		googleUserInfo: googleUserInfo,
		googleLogin: googleLogin
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
	
	function forgotPassword (user_email, new_password, confirm_password) {
		var deferred = $q.defer();
		loginService.forgotPassword(new_password, confirm_password).then(function (resp) {
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
	
	function fbLogin (user_details) {
		var deferred = $q.defer();
		loginService.fbLogin(user_details).then(function (resp) {
			deferred.resolve(resp.data);
		}, function(error) {
			console.log(error);
		});
		return deferred.promise;
	}
	
	function googleUserInfo (access_token) {
		var deferred = $q.defer();
		loginService.googleUserInfo(access_token).then(function (resp) {
			deferred.resolve(resp.data);
		}, function(error) {
			console.log(error);
		});
		return deferred.promise;
	}
	
	function googleLogin (user_details) {
		var deferred = $q.defer();
		loginService.googleLogin(user_details).then(function (resp) {
			deferred.resolve(resp.data);
		}, function(error) {
			console.log(error);
		});
		return deferred.promise;
	}
}]);
