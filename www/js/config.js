angular.module('eventsApp.config', ['ui.router']).config(function($stateProvider, $urlRouterProvider, $facebookProvider) {
    
    $facebookProvider.setAppId('1677847679144225');
    
    $stateProvider
    .state('splash', {
        url: '/',
        templateUrl: 'templates/splash.html'
    })
    .state('login', {
        url: '/login',
        controller: 'loginCtrl',
        templateUrl: 'templates/login.html'
    })
    .state('signup', {
        url: '/signup',
        controller: 'signupCtrl',
        templateUrl: 'templates/sign-up.html'
    })
    .state('forgotPassword', {
        url: '/forgotPassword',
        controller: 'forgotPasswordCtrl',
        templateUrl: 'templates/forgot-password.html'
    })    
    .state('home', {
        url: '/home',
        controller: 'homeCtrl',
        templateUrl: 'templates/home.html'
    })
    .state('eventDetails', {
        url: '/eventDetails',
        controller: 'eventDetailsCtrl',
        templateUrl: 'templates/heritage-hotel.html',
        params: {event_id: null}
    })
    .state('purchaseHistory', {
        url: '/purchaseHistory',
        controller: 'purchaseHistoryCtrl',
        templateUrl: 'templates/purchase-history.html'
    })
    .state('eventBooking', {
        url: '/eventBooking',
        controller: 'eventBookingCtrl',
        templateUrl: 'templates/event-booking.html'
    })
    .state('eventPayment', {
        url: '/eventPayment',
        controller: 'eventPaymentCtrl',
        templateUrl: 'templates/event-payment.html'
    })
    .state('finalPayment', {
        url: '/finalPayment',
        controller: 'finalPaymentCtrl',
        templateUrl: 'templates/payment.html'
    })
    .state('settings', {
        url: '/settings',
        controller: 'settingsCtrl',
        templateUrl: 'templates/setting.html'
    });

    $urlRouterProvider.otherwise('/');
});