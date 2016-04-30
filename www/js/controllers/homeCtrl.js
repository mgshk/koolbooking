angular.module('eventsApp.controllers.homeCtrl', [])
	.controller('homeCtrl', ['$scope', '$state', 'eventsFactory', 'userFactory', function($scope, $state, eventsFactory, userFactory) {
	
	if(window.localStorage.getItem('userID')) {
		$scope.showYouTab = true;

		userFactory.getUserDetails(window.localStorage.getItem('userID')).then(function (resp) {
			$scope.userDetails = resp.data;
		});
	}

	eventsFactory.getEventsList().then(function (resp) {
        $scope.eventsList = resp.data;
    });
    
    eventsFactory.getFeaturedEvents().then(function (resp) {
        $scope.featuredEvents = resp.data;
    });
    
    eventsFactory.getTopDealsEvents().then(function (resp) {
        $scope.topDealsEvents = resp.data;
    });

    eventsFactory.getVideoUrl().then(function (resp) {
    	$scope.videoUrls = resp.app_youtube_url;
    })
}]);
