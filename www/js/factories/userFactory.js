angular.module('eventsApp.factory.userFactory', [])
	.factory('userFactory', ['$q', 'userService', function($q, userService) {
	
	return {
	    getUserPurchaseHistory: getUserPurchaseHistory,
        getUserDetails: getUserDetails,
        addBooking: addBooking
	};
	
	function getUserPurchaseHistory (post_author) {
        var deferred = $q.defer();
        userService.getUserPurchaseHistory(post_author).then(function (resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            console.log(error);
        });
        return deferred.promise;
	}

    function getUserDetails (user_id) {
        var deferred = $q.defer();
        userService.getUserDetails(user_id).then(function (resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            console.log(error);
        });
        return deferred.promise;
    }

	function addBooking (booking_info) {
        var deferred = $q.defer();
        userService.addBooking(booking_info).then(function (resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            console.log(error);
        });
        return deferred.promise;
	}
}]);
