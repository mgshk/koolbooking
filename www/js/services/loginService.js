angular.module('eventsApp.service.loginService', [])
	.service('loginService', ['$http', function($http) {
		
		this.userLogin = function(user_email, user_pass) {
			return $http.get('http://koolbooking.com/android_app/login?user_login='+user_email+'&user_pass='+user_pass).then(function (resp) {
				return resp;
			});		
		}
		
		this.forgotPassword = function(user_email) {
			return $http.get('http://koolbooking.com/android_app/forgot_password?user_email='+user_email).then(function (resp) {
				return resp;
			});		
		}
		
		this.signUp = function(user) {
			return $http.get('http://koolbooking.com/android_app/adduser?first_name='+user.first_name+'&last_name='+user.last_name+'&user_email='+user.user_email+'&user_pass='+user.user_pass+'&st_phone='+user.st_phone).then(function (resp) {
				return resp;
			});		
		}
}]);
