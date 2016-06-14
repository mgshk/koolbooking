angular.module('eventsApp.controllers.eventsListCtrl', ['youtube-embed', 'angular-flexslider'])
	.controller('eventsListCtrl', ['$scope', '$state', '$q', 'eventsFactory', 'userFactory', '$ionicLoading', '$ionicHistory', function($scope, $state, $q, eventsFactory, userFactory, $ionicLoading, $ionicHistory) {

	$scope.showcase = true;
	$scope.tickets = false;
	$scope.you = false;
	$scope.discover = false;
	$scope.trending = false;
	$scope.comingsoon = false;
	var bestPlayer = null;
	$('.tab1').css('border-bottom', 'solid 4px #387ef5');
	$('.tab2').css('border-bottom', 'solid 0px #387ef5');
	$('.tab3').css('border-bottom', 'solid 0px #387ef5');
	$('.tab4').css('border-bottom', 'solid 0px #387ef5');

	$scope.logout = function(){
		window.localStorage.removeItem('userID');
	    $ionicHistory.clearCache();
	    $ionicHistory.clearHistory();
	    $state.go('login');
	}

	if (window.localStorage.getItem('userID') == null){
        $scope.isUserID = false;
        $scope.isLogin = true;
    } else {
        $scope.isUserID = true;
        $scope.isLogin = false;
    }

	$scope.showCase = function(){
		$scope.showcase = true;
		$scope.tickets = false;
		$scope.you = false;
		$scope.discover = false;
		$('.tab1').css('border-bottom', 'solid 4px #387ef5');
		$('.tab2').css('border-bottom', 'solid 0px #387ef5');
		$('.tab3').css('border-bottom', 'solid 0px #387ef5');
		$('.tab4').css('border-bottom', 'solid 0px #387ef5');
	}

	$scope.showTickets = function(){
		$scope.showcase = false;
		$scope.tickets = true;
		$scope.you = false;
		$scope.discover = false;
		$('.tab1').css('border-bottom', 'solid 0px #387ef5');
		$('.tab2').css('border-bottom', 'solid 4px #387ef5');
		$('.tab3').css('border-bottom', 'solid 0px #387ef5');
		$('.tab4').css('border-bottom', 'solid 0px #387ef5');

		if(bestPlayer)
			bestPlayer.stopVideo();
	}

	$scope.showYou = function(){
		$scope.showcase = false;
		$scope.tickets = false;
		$scope.you = true;
		$scope.discover = false;
		$('.tab1').css('border-bottom', 'solid 0px #387ef5');
		$('.tab2').css('border-bottom', 'solid 0px #387ef5');
		$('.tab3').css('border-bottom', 'solid 4px #387ef5');
		$('.tab4').css('border-bottom', 'solid 0px #387ef5');

		if(bestPlayer)
			bestPlayer.stopVideo();
	}

	$scope.showDiscover = function(){
		$scope.showcase = false;
		$scope.tickets = false;
		$scope.you = false;
		$scope.discover = true;
		$scope.recommended = true;
		$scope.trending = false;
		$scope.comingsoon = false;
		$('.tab1').css('border-bottom', 'solid 0px #387ef5');
		$('.tab2').css('border-bottom', 'solid 0px #387ef5');
		$('.tab3').css('border-bottom', 'solid 0px #387ef5');
		$('.tab4').css('border-bottom', 'solid 4px #387ef5');
		$('.tab5').css('color', '#387ef5');

		if(bestPlayer)
			bestPlayer.stopVideo();
	}

	$scope.showRecommened = function(){
		$scope.recommended = true;
		$scope.trending = false;
		$scope.comingsoon = false;
		$('.tab5').css('color', '#387ef5');
		$('.tab6').css('color', '#000000');
		$('.tab7').css('color', '#000000');
	}

	$scope.showTrending = function(){
		$scope.recommended = false;
		$scope.trending = true;
		$scope.comingsoon = false;
		$('.tab5').css('color', '#000000');
		$('.tab6').css('color', '#387ef5');
		$('.tab7').css('color', '#000000');
	}

	$scope.showComingsoon = function(){
		$scope.recommended = false;
		$scope.trending = false;
		$scope.comingsoon = true;
		$('.tab5').css('color', '#000000');
		$('.tab6').css('color', '#000000');
		$('.tab7').css('color', '#387ef5');
	}

	function showLoder() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="bubbles"></ion-spinner>'
	    });
	}

	function hideLoder(){
	    $ionicLoading.hide();
	}

	showLoder();

	eventsFactory.getVideoUrl().then(function (resp) {
        $scope.videoUrls = resp.app_youtube_url;
    });

    $q.all({
    	featuredEvents: eventsFactory.getFeaturedEvents(),
    	featuredActivities: eventsFactory.getFeaturedActivities()
    }).then(function(resp) {
    	if (resp.featuredEvents.status === 0 && resp.featuredActivities.status === 0) {
    		$scope.noFeaturedEvents = true;
    	} else {
    		$scope.featuredEvents = [];
    		$scope.featuredActivities = [];

    		angular.forEach(resp.featuredEvents.data, function(value) {
				if(angular.isDefined(value.adult_price)) {
					$scope.featuredEvents.push(value);
				}
			});

			angular.forEach(resp.featuredActivities.data, function(value) {
				if(angular.isDefined(value.adult_price)) {
					$scope.featuredActivities.push(value);
				}
			});

			if($scope.featuredEvents.length === 0 && $scope.featuredActivities.length === 0) {
				$scope.noFeaturedEvents = true;
			}
    	}

    	hideLoder();
    });

    $q.all({
    	topDealsEvents: eventsFactory.getTopDealsEvents(),
    	topDealsEventsActivities: eventsFactory.getTopDealsActivities()
    }).then(function(resp) {
    	if (resp.topDealsEvents.status === 0 && resp.topDealsEventsActivities.status === 0) {
    		$scope.noTopDealsEvents = true;
    	} else {
    		$scope.topDealsEvents = [];
    		$scope.topDealsActivities = [];

    		angular.forEach(resp.topDealsEvents.data, function(value) {
				if(angular.isDefined(value.adult_price)) {
					$scope.topDealsEvents.push(value);
				}
			});

			angular.forEach(resp.topDealsEventsActivities.data, function(value) {
				if(angular.isDefined(value.adult_price)) {
					$scope.topDealsActivities.push(value);
				}
			});

			if($scope.topDealsEvents.length === 0 && $scope.topDealsActivities.length === 0) {
				$scope.noTopDealsEvents = true;
			}
    	}

    	hideLoder();
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
