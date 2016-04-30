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
        url: '/eventDetails/:event_id',
        controller: 'eventDetailsCtrl',
        templateUrl: 'templates/event-details.html'
    })
    .state('purchaseHistory', {
        url: '/purchaseHistory/:user_id',
        controller: 'purchaseHistoryCtrl',
        templateUrl: 'templates/purchase-history.html'
    })
    .state('eventBooking', {
        url: '/eventBooking/:event_id',
        controller: 'eventBookingCtrl',
        templateUrl: 'templates/event-booking.html'
    })
    .state('eventPayment', {
        url: '/eventPayment/:event_id',
        controller: 'eventPaymentCtrl',
        templateUrl: 'templates/event-payment.html'
    })
    .state('finalPayment', {
        url: '/finalPayment/:event_id',
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