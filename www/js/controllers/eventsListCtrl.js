angular.module('eventsApp.controllers.eventsListCtrl', ['youtube-embed', 'angular-flexslider'])
	.controller('eventsListCtrl', ['$scope', '$state', 'eventsFactory', 'userFactory','$ionicHistory', '$sce', function($scope, $state, eventsFactory, userFactory, $ionicHistory, $sce) {

	$scope.showcase = true;
	$scope.tickets = false;
	$scope.you = false;
	$scope.discover = false;
	$scope.trending = false;
	$scope.comingsoon = false;
	var bestPlayer = null;
	$('.tab1').css('border-bottom', 'solid 4px #84d4f5');
	$('.tab2').css('border-bottom', 'solid 0px #84d4f5');
	$('.tab3').css('border-bottom', 'solid 0px #84d4f5');
	$('.tab4').css('border-bottom', 'solid 0px #84d4f5');
	
	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}

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
		$('.tab1').css('border-bottom', 'solid 4px #84d4f5');
		$('.tab2').css('border-bottom', 'solid 0px #84d4f5');
		$('.tab3').css('border-bottom', 'solid 0px #84d4f5');
		$('.tab4').css('border-bottom', 'solid 0px #84d4f5');
	}

	$scope.showTickets = function(){
		$scope.showcase = false;
		$scope.tickets = true;
		$scope.you = false;
		$scope.discover = false;
		$('.tab1').css('border-bottom', 'solid 0px #84d4f5');
		$('.tab2').css('border-bottom', 'solid 4px #84d4f5');
		$('.tab3').css('border-bottom', 'solid 0px #84d4f5');
		$('.tab4').css('border-bottom', 'solid 0px #84d4f5');

		if(bestPlayer)
			bestPlayer.stopVideo();
	}

	$scope.showYou = function(){
		$scope.showcase = false;
		$scope.tickets = false;
		$scope.you = true;
		$scope.discover = false;
		$('.tab1').css('border-bottom', 'solid 0px #84d4f5');
		$('.tab2').css('border-bottom', 'solid 0px #84d4f5');
		$('.tab3').css('border-bottom', 'solid 4px #84d4f5');
		$('.tab4').css('border-bottom', 'solid 0px #84d4f5');

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
		$('.tab1').css('border-bottom', 'solid 0px #84d4f5');
		$('.tab2').css('border-bottom', 'solid 0px #84d4f5');
		$('.tab3').css('border-bottom', 'solid 0px #84d4f5');
		$('.tab4').css('border-bottom', 'solid 4px #84d4f5');
		$('.tab5 span').css({'color' : '#0b5d8d','background-color' : '#84d4f5'});

		if(bestPlayer)
			bestPlayer.stopVideo();
	}

	$scope.showRecommened = function(){
		$scope.recommended = true;
		$scope.trending = false;
		$scope.comingsoon = false;
		$('.tab5 span').css({'color' : '#0b5d8d','background-color' : '#84d4f5'});
		$('.tab6 span').css({'color' : '#84d4f5','background-color' : '#0b5d8d'});
		$('.tab7 span').css({'color' : '#84d4f5','background-color' : '#0b5d8d'});
	}

	$scope.showTrending = function(){
		$scope.recommended = false;
		$scope.trending = true;
		$scope.comingsoon = false;
		$('.tab5 span').css({'color' : '#84d4f5','background-color' : '#0b5d8d'});
		$('.tab6 span').css({'color' : '#0b5d8d','background-color' : '#84d4f5'});
		$('.tab7 span').css({'color' : '#84d4f5','background-color' : '#0b5d8d'});
	}

	$scope.showComingsoon = function(){
		$scope.recommended = false;
		$scope.trending = false;
		$scope.comingsoon = true;
		$('.tab5 span').css({'color' : '#84d4f5','background-color' : '#0b5d8d'});
		$('.tab6 span').css({'color' : '#84d4f5','background-color' : '#0b5d8d'});
		$('.tab7 span').css({'color' : '#0b5d8d','background-color' : '#84d4f5'});
	}

	eventsFactory.getVideoUrl().then(function (resp) {
        $scope.videoUrls = resp.app_youtube_url;
    });
    
    eventsFactory.getFeaturedEvents().then(function (resp) {
    	$scope.featuredEvents = [];
    	if(resp.status === 0){
    		$scope.noFeaturedEvents = true;
    	}else{
    		angular.forEach(resp.data,function(value){
    			if(angular.isDefined(value.adult_price)){
    				$scope.featuredEvents.push(value);
    			}
    		});
    		if($scope.featuredEvents.length === 0){
    			$scope.noFeaturedEvents = true;
    		}
    	}
    });
    
    eventsFactory.getTopDealsEvents().then(function (resp) {
        $scope.topDealsEvents = [];
    	if(resp.status === 0){
    		$scope.noTopDealsEvents = true;
    	}else{
    		angular.forEach(resp.data,function(value){
    			if(angular.isDefined(value.adult_price)){
    				$scope.topDealsEvents.push(value);
    			}
    		});
    		if($scope.topDealsEvents.length === 0){
    			$scope.noTopDealsEvents = true;
    		}
    	} 
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
