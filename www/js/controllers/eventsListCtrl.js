angular.module('eventsApp.controllers.eventsListCtrl', [])
	.controller('eventsListCtrl', ['$scope', '$state', 'eventsFactory', 'userFactory', function($scope, $state, eventsFactory, userFactory) {

	$scope.showcase = true;
	$scope.tickets = false;
	$scope.you = false;
	$scope.discover = false;
	$scope.trending = false;
	$scope.comingsoon = false;
	$('.tab1').css('border-bottom', 'solid 4px #8c9ef2');
	$('.tab2').css('border-bottom', 'solid 0px #8c9ef2');
	$('.tab3').css('border-bottom', 'solid 0px #8c9ef2');
	$('.tab4').css('border-bottom', 'solid 0px #8c9ef2');

	$scope.showCase = function(){
		$scope.showcase = true;
		$scope.tickets = false;
		$scope.you = false;
		$scope.discover = false;
		$('.tab1').css('border-bottom', 'solid 4px #8c9ef2');
		$('.tab2').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab3').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab4').css('border-bottom', 'solid 0px #8c9ef2');
	}

	$scope.showTickets = function(){
		$scope.showcase = false;
		$scope.tickets = true;
		$scope.you = false;
		$scope.discover = false;
		$scope.all = true;
		$('.tab1').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab2').css('border-bottom', 'solid 4px #8c9ef2');
		$('.tab3').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab4').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab8').css('border-bottom', 'solid 4px #8c9ef2');
	}

	$scope.showYou = function(){
		$scope.showcase = false;
		$scope.tickets = false;
		$scope.you = true;
		$scope.discover = false;
		$('.tab1').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab2').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab3').css('border-bottom', 'solid 4px #8c9ef2');
		$('.tab4').css('border-bottom', 'solid 0px #8c9ef2');
	}

	$scope.showDiscover = function(){
		$scope.showcase = false;
		$scope.tickets = false;
		$scope.you = false;
		$scope.discover = true;
		$scope.recommended = true;
		$scope.trending = false;
		$scope.comingsoon = false;
		$('.tab1').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab2').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab3').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab4').css('border-bottom', 'solid 4px #8c9ef2');
		$('.tab5').css('border-top', 'solid 4px #8c9ef2');
	}

	$scope.showRecommened = function(){
		$scope.recommended = true;
		$scope.trending = false;
		$scope.comingsoon = false;
		$('.tab5').css('border-top', 'solid 4px #8c9ef2');
		$('.tab6').css('border-top', 'solid 0px #8c9ef2');
		$('.tab7').css('border-top', 'solid 0px #8c9ef2');
	}

	$scope.showTrending = function(){
		$scope.recommended = false;
		$scope.trending = true;
		$scope.comingsoon = false;
		$('.tab5').css('border-top', 'solid 0px #8c9ef2');
		$('.tab6').css('border-top', 'solid 4px #8c9ef2');
		$('.tab7').css('border-top', 'solid 0px #8c9ef2');
	}

	$scope.showComingsoon = function(){
		$scope.recommended = false;
		$scope.trending = false;
		$scope.comingsoon = true;
		$('.tab5').css('border-top', 'solid 0px #8c9ef2');
		$('.tab6').css('border-top', 'solid 0px #8c9ef2');
		$('.tab7').css('border-top', 'solid 4px #8c9ef2');
	}

	$scope.showAll = function(){
		$scope.all = true;
		$scope.event = false;
		$scope.activity = false;
		$('.tab8').css('border-bottom', 'solid 4px #8c9ef2');
		$('.tab9').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab10').css('border-bottom', 'solid 0px #8c9ef2');
	}

	$scope.showEvents = function(){
		$scope.all = false;
		$scope.event = true;
		$scope.activity = false;
		$('.tab8').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab9').css('border-bottom', 'solid 4px #8c9ef2');
		$('.tab10').css('border-bottom', 'solid 0px #8c9ef2');
	}

	$scope.showActivity = function(){
		$scope.all = false;
		$scope.event = false;
		$scope.activity = true;
		$('.tab8').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab9').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab10').css('border-bottom', 'solid 4px #8c9ef2');
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
	
	if (window.localStorage.getItem('userID')) {
		userFactory.getUserDetails(window.localStorage.getItem('userID')).then(function (resp) {
			$scope.userInfo = resp.data;
		});
    }
	
    $scope.filterEvents = function(searchTxt) {

    	if ($scope.address !== '') {
    		eventsFactory.getFilterEvents(searchTxt).then(function (resp) {
    			$scope.eventsList = resp.data; 
		    });
    	} else {
    		eventsFactory.getEventsList().then(function (resp) {
		        $scope.eventsList = resp.data;
		    });
    	}
    	
    }	
}]);
