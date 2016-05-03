angular.module('app.service.userService', [])
	.service('userService', ['$http', function($http) {
		
		this.userDetail = function(userId) {
			return $http.get('http://localhost/workplace/stubs/userDetail.json', {userId: userId}).then(function (resp) {
				return resp;
			});		
		}
}]);
