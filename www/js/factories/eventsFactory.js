angular.module('eventsApp.factory.eventsFactory', [])
	.factory('eventsFactory', ['$q', 'eventsService', function($q, eventsService) {
	
	return {
	    getEventsList: getEventsList,
	    getFeaturedEvents: getFeaturedEvents,
	    getTopDealsEvents: getTopDealsEvents,
	    getEventDetails: getEventDetails,
	    getFilterEvents: getFilterEvents,
        getVideoUrl: getVideoUrl
	};
	
	function getEventsList () {
        var deferred = $q.defer();
        eventsService.getEventsList().then(function (resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            console.log(error);
        });
        return deferred.promise;
	}
	
	function getFeaturedEvents () {
        var deferred = $q.defer();
        eventsService.getFeaturedEvents().then(function (resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            console.log(error);
        });
        return deferred.promise;
	}
	
	function getTopDealsEvents () {
        var deferred = $q.defer();
        eventsService.getTopDealsEvents().then(function (resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            console.log(error);
        });
        return deferred.promise;
	}
	
	function getEventDetails (event_ID) {
        var deferred = $q.defer();
        eventsService.getEventDetails(event_ID).then(function (resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            console.log(error);
        });
        return deferred.promise;
	}
	
	function getFilterEvents (address) {
        var deferred = $q.defer();
        eventsService.getFilterEvents(address).then(function (resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            console.log(error);
        });
        return deferred.promise;
	}

    function getVideoUrl () {
        var deferred = $q.defer();
        eventsService.getVideoUrl().then(function (resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            console.log(error);
        });
        return deferred.promise;
    }
}]);
