angular.module('eventsApp.controllers.purchaseHistoryCtrl', [])
	.controller('purchaseHistoryCtrl', ['$scope', '$state', 'userFactory', '$ionicLoading', '$ionicHistory', function($scope, $state, userFactory, $ionicLoading, $ionicHistory) {
	
	if (!window.localStorage.getItem('userID')) {
        $state.go('eventsList');
    }

    $scope.noRecords = false;

	$scope.showLoder = function() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="bubbles"></ion-spinner>'
	    });
	 };
	$scope.hideLoder = function(){
	    $ionicLoading.hide();
	};

	if(window.localStorage.getItem('userID') == null){
    	$scope.isUserID = false;
    }else{
        $scope.isUserID = true;
    }

	//$scope.showLoder();

	userFactory.getUserPurchaseHistory(window.localStorage.getItem('userID')).then(function (resp) {
	 	$scope.hideLoder();
	 	$scope.userHistories = resp.data;
	 	if($scope.userHistories == null){
	 		$scope.noRecords = true;
	 	}
	});
}]);
