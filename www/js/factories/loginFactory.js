angular.module('app.factory.loginFactory', [])
	.factory('loginFactory', ['$q', 'loginService', function($q, loginService) {
	
	return {
		userLogin: userLogin,
		forgotPassword: forgotPassword,
		signUp: signUp
	};
	
	function userLogin (user) {
		var deferred = $q.defer();
		loginService.userLogin(user).then(function (resp) {
			deferred.resolve(resp.data);
		}, function(error) {
			console.log(error);
		});
		return deferred.promise;
	}
	
	function forgotPassword (user) {
		var deferred = $q.defer();
		loginService.forgotPassword(user).then(function (resp) {
			deferred.resolve(resp);
		}, function(error) {
			console.log(error);
		});
		return deferred.promise;
	}
	
	function signUp (user) {
		var deferred = $q.defer();
		loginService.signUp(user).then(function (resp) {
			deferred.resolve(resp);
		}, function(error) {
			console.log(error);
		});
		return deferred.promise;
	}
}]);
