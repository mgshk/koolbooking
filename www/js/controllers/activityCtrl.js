angular.module('eventsApp.controllers.activityCtrl', [])
	.controller('activityCtrl', ['$scope', '$state', 'eventsFactory', '$ionicLoading', function($scope, $state, eventsFactory, $ionicLoading) {
    
    $scope.noRecords = false;

	function showLoder() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="circles"></ion-spinner>'
	    });
	}

	function hideLoder(){
	    $ionicLoading.hide();
	}

	showLoder();

    eventsFactory.getActivitiesList().then(function (resp) {
    	hideLoder();

        $scope.activitiesList = [];
    	if(resp.status === 0){
    		$scope.noRecords = true;
    	}else{
    		angular.forEach(resp.data, function(value) {
				if(angular.isDefined(value.adult_price)) {
					$scope.activitiesList.push(value);
				}
			});

    		if($scope.activitiesList.length === 0){
    			$scope.noRecords = true;
    		}
    	} 
    });
}]);

