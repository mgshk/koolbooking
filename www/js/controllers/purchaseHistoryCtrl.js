angular.module('eventsApp.controllers.purchaseHistoryCtrl', [])
	.controller('purchaseHistoryCtrl', ['$scope', '$state', 'userFactory', function($scope, $state, userFactory) {
	
	if (!window.localStorage.getItem('userID')) {
     $state.go('eventsList');
    }
	
	userFactory.getUserPurchaseHistory(window.localStorage.getItem('userID')).then(function (resp) {
		$scope.userHistories = resp.data;
	});
}]);
