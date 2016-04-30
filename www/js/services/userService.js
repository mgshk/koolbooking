angular.module('eventsApp.service.userService', [])
    .service('userService', ['$http', function($http) {

    this.getUserDetails = function(user_id) {
	    return $http.get('http://koolbooking.com/android_app/getuser_details?user_id='+user_id).then(function (resp) {
			return resp;
	    });		
	}
	    
	this.getUserPurchaseHistory = function(post_author) {
	    return $http.get('http://koolbooking.com/android_app/purchase_history?post_author='+post_author).then(function (resp) {
			return resp;
	    });		
	}

	this.cardPayment = function(post_author) {
	    return $http.get('http://koolbooking.com/android_app/purchase_history?post_author='+post_author).then(function (resp) {
			return resp;
	    });		
	}

	this.paypalPayment = function(user_details) {
	    return $http.get('/paypal/form.php?user_details='+user_details);		
	}
}]);
