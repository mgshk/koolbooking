angular.module('eventsApp.controllers.showcaseCtrl', ['youtube-embed', 'angular-flexslider'])
	.controller('showcaseCtrl', ['$scope', 'eventsFactory', function($scope, eventsFactory) {

	var bestPlayer;
	
	if (window.localStorage.getItem('userID') == null){
        $scope.isUserID = false;
        $scope.isLogin = true;
    } else {
        $scope.isUserID = true;
        $scope.isLogin = false;
    }

	if(bestPlayer){
		bestPlayer.stopVideo();
	}

	eventsFactory.getVideoUrl().then(function (resp) {
        $scope.videoUrls = resp.app_youtube_url;
    });
	
	if (window.localStorage.getItem('userID')) {
		userFactory.getUserDetails(window.localStorage.getItem('userID')).then(function (resp) {
			$scope.userInfo = resp.data;
		});
    }

    $scope.$on('youtube.player.playing', function ($event, player) {
	    bestPlayer = player;
	});

	$scope.$on('youtube.player.ended', function ($event, player) {
	    bestPlayer = '';
	});
}]);
