
angular.module('eventsApp.controllers.eventsListCtrl', ['youtube-embed', 'angular-flexslider'])
	.controller('eventsListCtrl', ['$scope', '$state', '$q', 'eventsFactory', 'userFactory', '$ionicLoading', '$ionicHistory', function($scope, $state, $q, eventsFactory, userFactory, $ionicLoading, $ionicHistory) {

	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}
	var bestPlayer = null;

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

}]);
