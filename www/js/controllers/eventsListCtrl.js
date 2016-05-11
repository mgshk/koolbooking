angular.module('eventsApp.controllers.eventsListCtrl', [])
	.controller('eventsListCtrl', ['$scope', '$state', 'eventsFactory', 'userFactory','$ionicHistory', function($scope, $state, eventsFactory, userFactory, $ionicHistory) {

	$scope.showcase = true;
	$scope.tickets = false;
	$scope.you = false;
	$scope.discover = false;
	$scope.trending = false;
	$scope.comingsoon = false;
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

	eventsFactory.getVideoUrl().then(function (resp) {
        $scope.videoUrls = resp.app_youtube_url;
    });
    
    eventsFactory.getFeaturedEvents().then(function (resp) {
        $scope.featuredEvents = resp.data;
    });
    
    eventsFactory.getTopDealsEvents().then(function (resp) {
        $scope.topDealsEvents = resp.data; 
    });
	
	if (window.localStorage.getItem('userID')) {
		userFactory.getUserDetails(window.localStorage.getItem('userID')).then(function (resp) {
			$scope.userInfo = resp.data;
		});
    }

}]);
