angular.module('eventsApp.controllers.purchaseHistoryCtrl', [])
	.controller('purchaseHistoryCtrl', ['$scope', '$state', 'userFactory', '$ionicLoading', '$ionicHistory', function($scope, $state, userFactory, $ionicLoading, $ionicHistory) {
	
	$scope.noRecords = false;
    $scope.noCompleteRecords = false;
    $scope.noPendingRecords = false;

    $scope.showUsedTickets1 = true;
	$scope.showToUsedTickets1 = false;
	$('.tab31').css('color', '#387ef5');
	$('.tab33').css('color', '#000000');

	function showLoader() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="circles"></ion-spinner>'
	    });
	};

	function hideLoader() {
	    $ionicLoading.hide();
	};

	if(window.localStorage.getItem('userID') == null){
    	$scope.isUserID = false;
    }else{
        $scope.isUserID = true;
    }

	showLoader();

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
		 	hideLoader();
		 	$scope.userPurchanseHistories = []; 
		
		 	if(resp.status === 0){
		 		$scope.noRecords = true;
		 	} else {
		 		angular.forEach(resp.data, function (value) {
		 			$scope.userPurchanseHistories.push(value);
		 		});

		 		if ($scope.userPurchanseHistories.length === 0) {
		 			$scope.noRecords = true;
		 		}
		 	}
		});
	} else {
		hideLoader();
		$scope.noRecords = true;
	}	
}]);
