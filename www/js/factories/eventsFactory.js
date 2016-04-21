angular.module('eventsApp.factory.eventsFactory', [])
	.factory('eventsFactory', ['$q', 'eventsService', function($q, eventsService) {
	
	return {
	    getEventsList: getEventsList,
	    getEventDetails: getEventDetails
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
	
	function getEventDetails (event_ID) {
            var deferred = $q.defer();
            eventsService.getEventDetails(event_ID).then(function (resp) {
                deferred.resolve(resp.data);
            }, function(error) {
                console.log(error);
            });
            return deferred.promise;
	}
}]);
