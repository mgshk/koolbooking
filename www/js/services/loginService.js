angular.module('eventsApp.service.loginService', [])
	.service('loginService', ['$http', function($http) {
		
		this.userLogin = function(user_email, user_pass) {
			return $http.get('https://koolbooking.com/android_app/login?user_login='+user_email+'&user_pass='+user_pass)
			.success(function (resp) {
				return resp;
			}).error(function(data, status){
				//alert(data+' '+status);
			});		
		}
		
		this.forgotPassword = function(user_email, new_password, confirm_password) {
			return $http.get('http://koolbooking.com/android_app/forgot_password?user_email='+user_email+'&new_password='+new_password+'&confirm_password='+confirm_password).then(function (resp) {
				return resp;
			});		
		}
		
		this.signUp = function(user) {
			return $http.get('http://koolbooking.com/android_app/adduser?first_name='+user.first_name+'&last_name='+user.last_name+'&user_email='+user.user_email+'&user_pass='+user.user_pass+'&st_phone='+user.st_phone).then(function (resp) {
				return resp;
			});		
		}
		
		this.fbLogin = function(user_details) {
			return $http.get('http://koolbooking.com/android_app/social_login?first_name='+user_details.first_name+'&last_name='+user_details.last_name+'&user_email='+user_details.email+'&name='+user_details.name+'&link='+user_details.link).then(function (resp) {
				return resp;
			});		
		}
		
		this.googleUserInfo = function(access_token) {
			return $http.get('https://www.googleapis.com/oauth2/v1/userinfo?access_token='+access_token).then(function (resp) {
				return resp;
			});		
		}
		
		this.googleLogin = function(user_details) {
			return $http.get('http://koolbooking.com/android_app/social_login?first_name='+user_details.first_name+'&last_name='+user_details.last_name+'&user_email='+user_details.email+'&name='+user_details.name+'&link='+user_details.link).then(function (resp) {
				return resp;
			});		
		}
}]);
