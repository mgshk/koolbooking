angular.module('eventsApp.controllers.purchaseHistoryCtrl', [])
	.controller('purchaseHistoryCtrl', ['$scope', '$state', 'userFactory', '$ionicLoading', '$ionicHistory', function($scope, $state, userFactory, $ionicLoading, $ionicHistory) {
	
	if (!window.localStorage.getItem('userID')) {
        $state.go('eventsList');
    }

    $scope.noRecords = false;
    $scope.showUsedTickets1 = true;
	$scope.showToUsedTickets1 = false;
	$('.tab31').css('color', '#387ef5');
	$('.tab33').css('color', '#000000');

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

	$scope.showLoder();

	$scope.showUsedTickets = function(){
		$scope.showUsedTickets1 = true;
		$scope.showToUsedTickets1 = false;
		$('.tab31').css('color', '#387ef5');
		$('.tab33').css('color', '#000000');
	}

	$scope.showToUsedTickets = function(){
		$scope.showUsedTickets1 = false;
		$scope.showToUsedTickets1 = true;
		$('.tab31').css('color', '#000000');
		$('.tab33').css('color', '#387ef5');
	}

	userFactory.getUserPurchaseHistory(window.localStorage.getItem('userID')).then(function (resp) {
	 	$scope.hideLoder();
	 	$scope.userHistories = resp.data;
	 	if($scope.userHistories == null){
	 		$scope.noRecords = true;
	 	}
	});
	
}]);
