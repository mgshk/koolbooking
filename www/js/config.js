angular.module('eventsApp.config', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
.state('splash', {
    url: '/',
    controller: 'splashCtrl',
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

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
