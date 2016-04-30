angular.module('eventsApp.controllers.purchaseHistoryCtrl', [])
	.controller('purchaseHistoryCtrl', ['$scope', '$stateParams', 'userFactory', function($scope, $stateParams, userFactory) {

	userFactory.getUserPurchaseHistory($stateParams.user_id).then(function(resp) {
	    $scope.userHistory = resp;   
	});

}]);
