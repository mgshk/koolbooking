angular.module('eventsApp.controllers.eventDetailsCtrl', [])
    .controller('eventDetailsCtrl', ['$scope', '$state', '$stateParams', 'eventsFactory', '$ionicLoading', '$ionicHistory', function($scope, $state, $stateParams, eventsFactory, $ionicLoading, $ionicHistory) {
    
    if ($stateParams.event_id === "") {
        $state.go('home');
        return;
    }
    
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

    eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
    	hideLoder();

        if (resp.status === 0) {
            $scope.noRecords = true;
        } else {
            $scope.event = resp.data[0];

            var event_details = {
                id: resp.data[0].id,
                post_content: resp.data[0].post_content,
                event_date: resp.data[0].event_date,
                event_time: resp.data[0].event_time,
                max_people: resp.data[0].max_people,
                venue_facilities: resp.data[0].venue_facilities,
                adult_price: resp.data[0].adult_price,
                child_price: resp.data[0].child_price,
                infant_price: resp.data[0].infant_price
            };

            window.localStorage.setItem('event_details', JSON.stringify(event_details));
        }
    });
}]);
