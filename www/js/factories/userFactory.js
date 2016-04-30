angular.module('eventsApp.factory.userFactory', [])
	.factory('userFactory', ['$q', 'userService', function($q, userService) {
	
	return {
	    getUserPurchaseHistory: getUserPurchaseHistory,
        getUserDetails: getUserDetails
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

	function cardPayment (card_details) {
        var deferred = $q.defer();
        userService.cardPayment(card_details).then(function (resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            console.log(error);
        });
        return deferred.promise;
	}

	function paypalPayment (user_details) {
        var deferred = $q.defer();
        userService.paypalPayment(user_details).then(function (resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            console.log(error);
        });
        return deferred.promise;
	}
}]);
