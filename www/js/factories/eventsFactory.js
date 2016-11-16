angular.module('eventsApp.factory.eventsFactory', [])
    .factory('eventsFactory', ['$q', 'eventsService', function($q, eventsService) {
    
    return {
        getEventsList: getEventsList,
        getActivitiesList: getActivitiesList,
        getFeaturedEvents: getFeaturedEvents,
        getTopDealsEvents: getTopDealsEvents,
        getEventDetails: getEventDetails,
        getFilterEvents: getFilterEvents,
        getVideoUrl: getVideoUrl,
        getActivityDetails: getActivityDetails,
        getFeaturedActivities: getFeaturedActivities,
        getTopDealsActivities: getTopDealsActivities
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

    function getActivitiesList () {
        var deferred = $q.defer();
        eventsService.getActivitiesList().then(function (resp) {
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
            //console.log(error);
        });
        return deferred.promise;
    }

    function getFeaturedActivities () {
        var deferred = $q.defer();
        eventsService.getFeaturedActivities().then(function (resp) {
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

    function getTopDealsActivities () {
        var deferred = $q.defer();
        eventsService.getTopDealsActivities().then(function (resp) {
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

    function getActivityDetails (event_ID) {
        var deferred = $q.defer();
        eventsService.getActivityDetails(event_ID).then(function (resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            console.log(error);
        });
        return deferred.promise;
    }
    
    function getFilterEvents (address, startDate, endDate) {
        var deferred = $q.defer();
        eventsService.getFilterEvents(address, startDate, endDate).then(function (resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            console.log(error);
        });
        return deferred.promise;
    }

    function getFilterActivities (address, startDate, endDate) {
        var deferred = $q.defer();
        eventsService.getFilterEvents(address, startDate, endDate).then(function (resp) {
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
