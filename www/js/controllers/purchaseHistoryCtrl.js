angular.module('eventsApp.controllers.purchaseHistoryCtrl', [])
	.controller('purchaseHistoryCtrl', ['$scope', '$state', 'userFactory', '$ionicLoading', '$ionicHistory', function($scope, $state, userFactory, $ionicLoading, $ionicHistory) {
	
	$scope.noRecords = false;
    $scope.noCompleteRecords = false;
    $scope.noPendingRecords = false;

    $scope.showUsedTickets1 = true;
	$scope.showToUsedTickets1 = false;
	$('.tab31').css('color', '#387ef5');
	$('.tab33').css('color', '#000000');

	$scope.showLoder = function() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="circles"></ion-spinner>'
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

	if(window.localStorage.getItem('userID')) {
		userFactory.getUserPurchaseHistory(window.localStorage.getItem('userID')).then(function (resp) {
		 	$scope.hideLoder();
		 	$scope.userPendingHistories = [];
		 	$scope.userCompleteHistories = []; 
		
		 	if(resp.status === 0){
		 		$scope.noRecords = true;
		 	} else {
		 		angular.forEach(resp.data, function (value) {
		 			if(value.status === 'complete') {
		 				$scope.userCompleteHistories.push(value);
		 			} else {
		 				$scope.userPendingHistories.push(value);
		 			}
		 		});

		 		if ($scope.userCompleteHistories.length === 0) {
		 			$scope.noCompleteRecords = true;
		 		}

		 		if ($scope.userPendingHistories.length === 0) {
		 			$scope.noPendingRecords = true;
		 		}
		 	}
		});
	} else {
		$scope.hideLoder();
		$scope.noRecords = true;
	}	
}]);
