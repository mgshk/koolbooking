angular.module('eventsApp.controllers.paymentCtrl', [])
	.controller('paymentCtrl', ['$scope', '$state', '$ionicHistory', function($scope, $state, $ionicHistory) {

		$scope.logout = function(){
	        window.localStorage.removeItem('userID');
	        $ionicHistory.clearCache();
	        $ionicHistory.clearHistory();
	        $state.go('login');
    	}

		$scope.paypalpayment = false;
		$scope.cardspayment = false;

		$scope.checkPaypal = function(){
			$scope.cardspayment = false;
		}

		$scope.checkCards = function(){
			$scope.paypalpayment = false;
		}

}]);
