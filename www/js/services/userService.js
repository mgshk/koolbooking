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

	this.addBooking = function(booking_info) {
	    return $http.get('http://koolbooking.com/android_app/addbooking_checkout?item_id='+booking_info.item_id+'&adult_price='+booking_info.adult_price+'&child_price='+booking_info.child_price+'&infant_price='+booking_info.infant_price+'&adult_number='+booking_info.adult_number+'&child_number='+booking_info.child_number+'&infant_number='+booking_info.infant_number+'&ori_price='+booking_info.total_price+'&total_price='+booking_info.total_price+'&type_price='+booking_info.type_price+'&check_in='+booking_info.check_in+'&payment_method=paypal').then(function (resp) {
			return resp;
	    });		
	}
}]);
