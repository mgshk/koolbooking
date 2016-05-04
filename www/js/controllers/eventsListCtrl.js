angular.module('eventsApp.controllers.eventsListCtrl', [])
	.controller('eventsListCtrl', ['$scope', '$state', 'eventsFactory', function($scope, $state, eventsFactory) {

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
		$('.tab1').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab2').css('border-bottom', 'solid 4px #8c9ef2');
		$('.tab3').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab4').css('border-bottom', 'solid 0px #8c9ef2');
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

    eventsFactory.getEventsList().then(function (resp) {
        $scope.eventsList = resp.data;
    });
    
    eventsFactory.getFeaturedEvents().then(function (resp) {
        $scope.featuredEvents = resp.data;
    });
    
    eventsFactory.getTopDealsEvents().then(function (resp) {
        $scope.topDealsEvents = resp.data; 
    });
	
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
