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
	
	this.getFilterEvents = function(address) {
	    return $http.get('http://koolbooking.com/android_app/filter_events?address='+address).then(function (resp) {
			return resp;
	    });		
	}

	this.getVideoUrl = function(address) {
	    return $http.get('http://koolbooking.com/android_app/get_logo_video_url').then(function (resp) {
			return resp;
	    });		
	}
}]);
