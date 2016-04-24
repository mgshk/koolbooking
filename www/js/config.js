angular.module('eventsApp.config', ['ui.router', 'ngFacebook']).config(function($stateProvider, $urlRouterProvider, $facebookProvider) {
    
    $facebookProvider.setAppId('1677847679144225');
    
    $stateProvider
    .state('home', {
        url: '/',
        controller: 'homeCtrl',
        templateUrl: 'templates/home.html',
        isRequiredLogin: false
    })
    .state('login', {
        url: '/login',
        controller: 'loginCtrl',
        templateUrl: 'templates/login.html',
        isRequiredLogin: false
    })
    .state('signup', {
        url: '/signup',
        controller: 'signupCtrl',
        templateUrl: 'templates/signup.html',
        isRequiredLogin: false
    })
    .state('forgotPassword', {
        url: '/forgotPassword',
        controller: 'forgotPasswordCtrl',
        templateUrl: 'templates/forgotPassword.html',
        isRequiredLogin: false
    })    
    .state('eventsList', {
        url: '/eventsList',
        controller: 'eventsListCtrl',
        templateUrl: 'templates/eventsList.html',
        isRequiredLogin: true
    })
    .state('eventDetails', {
        url: '/eventDetails/:event_id',
        controller: 'eventDetailsCtrl',
        templateUrl: 'templates/eventDetails.html',
        isRequiredLogin: true
    })
    .state('filterEvents', {
        url: '/filterEvents/:address/:start_date',
        controller: 'filterEventsCtrl',
        templateUrl: 'templates/filterEvents.html',
        isRequiredLogin: true
    })
    .state('yourBooking', {
        url: '/yourBooking',
        controller: 'yourBookingCtrl',
        templateUrl: 'templates/yourBooking.html',
        isRequiredLogin: true
    })
    .state('bookingSubmission', {
        url: '/bookingSubmission',
        controller: 'bookingSubmissionCtrl',
        templateUrl: 'templates/bookingSubmission.html',
        isRequiredLogin: true
    })
    .state('payment', {
        url: '/payment',
        controller: 'paymentCtrl',
        templateUrl: 'templates/payment.html',
        isRequiredLogin: true
    });
    
    $urlRouterProvider.otherwise('/');
});
