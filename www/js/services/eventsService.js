angular.module('eventsApp.service.eventsService', [])
    .service('eventsService', ['$http', function($http) {
	    
	this.getEventsList = function() {
	    return $http.get('http://koolbooking.com/android_app/geteventlist').then(function (resp) {
		return resp;
	    });		
	}
	
	this.getFeaturedEvents = function() {
	    return $http.get('http://koolbooking.com/android_app/getfeaturedeventlist').then(function (resp) {
		return resp;
	    });		
	}
	
	this.getTopDealsEvents = function() {
	    return $http.get('http://koolbooking.com/android_app/gettopdealseventlist').then(function (resp) {
		return resp;
	    });		
	}
	
	this.getEventDetails = function(event_ID) {
	    return $http.get('http://koolbooking.com/android_app/getevent_details?event_ID='+event_ID).then(function (resp) {
		return resp;
	    });		
	}
	
	this.getFilterEvents = function(address, start_date) {
	    return $http.get('http://koolbooking.com/android_app/filter_events?address='+address+'&start_date='+start_date).then(function (resp) {
		return resp;
	    });		
	}
}]);
