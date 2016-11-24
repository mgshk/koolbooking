angular.module('eventsApp.controllers.loginCtrl', [])
    .controller('loginCtrl', ['$scope', '$state', 'loginFactory', '$ionicLoading', '$ionicPopup', '$http', '$ionicModal' , function($scope, $state, loginFactory, $ionicLoading, $ionicPopup, $http, $ionicModal) {

    var errorMsg;
    $scope.login = {user_email: '', user_pass: ''};

    if (window.localStorage.getItem('userID')) {
       $state.go('eventsList');
    }

    function showLoder() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="circles"></ion-spinner>'
	    });
	 };

	function hideLoder(){
	    $ionicLoading.hide();
	};

	// An alert dialog
 	$scope.showAlert = function() {
	    $ionicPopup.alert({
	      title: 'Login',
	      content: errorMsg
	    }).then(function(res) {
	      console.log('Login Failed');
	    });
    };
    
    $scope.login = function() {	
    	showLoder();
		loginFactory.userLogin ($scope.login.user_email, $scope.login.user_pass).then(function (resp) {
			hideLoder();
		    if (resp.status === 0) {
				errorMsg = resp.error;
				$scope.showAlert();
				$scope.user_email = '';
				$scope.user_pass = '';
				$scope.loginForm.$setPristine();
				$scope.loginForm.$setUntouched();
				return;
		    }
		    window.localStorage.setItem('userID', resp.data.ID);
		    $state.go('eventsList');
		});
	}

    $ionicModal.fromTemplateUrl('terms.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	}).then(function(modal) {
	    $scope.modal = modal;
	});

	$scope.openModal = function() {
	    $scope.modal.show();
	};

	$scope.closeModal = function() {
	    $scope.modal.hide();
	};

}]);
