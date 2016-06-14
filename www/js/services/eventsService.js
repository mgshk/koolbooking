angular.module('eventsApp.service.eventsService', [])
    .service('eventsService', ['$http', function($http) {
	    
	this.getEventsList = function() {
	    return $http.get('http://koolbooking.com/android_app/geteventlist').then(function (resp) {
			return resp;
	    });		
	}

	this.getActivitiesList = function() {
	    return $http.get('http://koolbooking.com/android_app/getactivitylist').then(function (resp) {
			return resp;
	    });		
	}
	
	this.getFeaturedEvents = function() {
	    return $http.get('http://koolbooking.com/android_app/getfeaturedeventlist').then(function (resp) {
			return resp;
	    });		
	}

	this.getFeaturedActivities = function() {
	    return $http.get('http://koolbooking.com/android_app/activity_getfeaturedlist').then(function (resp) {
			return resp;
	    });		
	}
	
	this.getTopDealsEvents = function() {
	    return $http.get('http://koolbooking.com/android_app/gettopdealseventlist').then(function (resp) {
			return resp;
	    });		
	}

	this.getTopDealsActivities = function() {
	    return $http.get('http://koolbooking.com/android_app/activity_gettopdealslist').then(function (resp) {
			return resp;
	    });		
	}
	
	this.getEventDetails = function(event_ID) {
	    return $http.get('http://koolbooking.com/android_app/getevent_details?event_ID='+event_ID).then(function (resp) {
			return resp;
	    });		
	}

	this.getActivityDetails = function(activity_ID) {
	    return $http.get('http://koolbooking.com/android_app/getactivity_details?activity_ID='+activity_ID).then(function (resp) {
			return resp;
	    });		
	}
	
	this.getFilterEvents = function(address, startDate, endDate) {
	    return $http.get('http://koolbooking.com/android_app/filter_events?address='+address+'&start_date='+startDate+'&end_date='+endDate).then(function (resp) {
			return resp;
	    });		
	}

	this.getFilterActivities = function(address, startDate, endDate) {
	    return $http.get('http://koolbooking.com/android_app/filter_activity?address='+address+'&start_date='+startDate+'&end_date='+endDate).then(function (resp) {
			return resp;
	    });		
	}

	this.getVideoUrl = function() {
	    return $http.get('http://koolbooking.com/android_app/get_logo_video_url').then(function (resp) {
			return resp;
	    });		
	}
}]);
