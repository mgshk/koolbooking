angular.module('eventsApp.controllers.purchaseHistoryCtrl', [])
	.controller('purchaseHistoryCtrl', ['$scope', '$state', 'userFactory', '$ionicLoading', function($scope, $state, userFactory, $ionicLoading) {
	
	if (!window.localStorage.getItem('userID')) {
     $state.go('eventsList');
    }

	$scope.showLoder = function() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="bubbles"></ion-spinner>'
	    });
	 };
	$scope.hideLoder = function(){
	    $ionicLoading.hide();
	};

	$scope.showLoder();

	userFactory.getUserPurchaseHistory(window.localStorage.getItem('userID')).then(function (resp) {
		$scope.hideLoder();
		$scope.userHistories = resp.data;
	});
}]);
