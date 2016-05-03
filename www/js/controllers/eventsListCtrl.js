angular.module('eventsApp.controllers.eventsListCtrl', [])
	.controller('eventsListCtrl', ['$scope', function($scope) {

	$scope.showcase = true;
	$scope.tickets = false;
	$scope.you = false;
	$scope.discover = false;
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
		$('.tab1').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab2').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab3').css('border-bottom', 'solid 0px #8c9ef2');
		$('.tab4').css('border-bottom', 'solid 4px #8c9ef2');
	}
	
}]);
