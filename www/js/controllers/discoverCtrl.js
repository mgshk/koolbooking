angular.module('eventsApp.controllers.discoverCtrl', [])
	.controller('discoverCtrl',['$scope','eventsFactory', function($scope, eventsFactory) {

	$scope.recommended = true;
	$scope.trending = false;
	$scope.comingsoon = false;
	$('.tab5').css({'color':'#0b5d8d','background-color':'#84d4f5'});
	$('.tab6').css({'color':'#84d4f5','background-color':'#0b5d8d'});
	$('.tab7').css({'color':'#84d4f5','background-color':'#0b5d8d'});

	$scope.showRecommened = function(){
		$scope.recommended = true;
		$scope.trending = false;
		$scope.comingsoon = false;
		$('.tab5').css({'color':'#0b5d8d','background-color':'#84d4f5'});
		$('.tab6').css({'color':'#84d4f5','background-color':'#0b5d8d'});
		$('.tab7').css({'color':'#84d4f5','background-color':'#0b5d8d'});
	}

	$scope.showTrending = function(){
		$scope.recommended = false;
		$scope.trending = true;
		$scope.comingsoon = false;
		$('.tab5').css({'color':'#84d4f5','background-color':'#0b5d8d'});
		$('.tab6').css({'color':'#0b5d8d','background-color':'#84d4f5'});
		$('.tab7').css({'color':'#84d4f5','background-color':'#0b5d8d'});
	}

	$scope.showComingsoon = function(){
		$scope.recommended = false;
		$scope.trending = false;
		$scope.comingsoon = true;
		$('.tab5').css({'color':'#84d4f5','background-color':'#0b5d8d'});
		$('.tab6').css({'color':'#84d4f5','background-color':'#0b5d8d'});
		$('.tab7').css({'color':'#0b5d8d','background-color':'#84d4f5'});
	}

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
    
}]);
