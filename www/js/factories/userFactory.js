angular.module('app.factory.userFactory', [])
	.factory('userFactory', ['$q', 'userService', function($q, userService) {
	
	return {
		getUserDetail: getUserDetail
	};
	
	function getUserDetail (userId) {
		var deferred = $q.defer();
		userService.userDetail(userId).then(function (resp) {
			deferred.resolve(resp.data);
		}, function(error) {
			console.log(error);
		});
		return deferred.promise;
	}
}]);
