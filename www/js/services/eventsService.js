angular.module('eventsApp.service.eventsService', [])
	.service('eventsService', ['$http', function($http) {
		
            this.getEventsList = function() {
                return $http.get('http://koolbooking.com/android_app/geteventlist').then(function (resp) {
                    return resp;
                });		
            }
            
            this.getEventDetails = function(event_ID) {
                return $http.get('http://koolbooking.com/android_app/getevent_details?event_ID='+event_ID).then(function (resp) {
                    return resp;
                });		
            }
}]);
