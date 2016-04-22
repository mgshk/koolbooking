angular.module('eventsApp.config', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
.state('home', {
    url: '/',
    controller: 'homeCtrl',
    templateUrl: 'templates/home.html'
})
.state('login', {
    url: '/login',
    controller: 'loginCtrl',
    templateUrl: 'templates/login.html'
})
.state('signup', {
    url: '/signup',
    controller: 'signupCtrl',
    templateUrl: 'templates/signup.html'
})
.state('forgotPassword', {
    url: '/forgotPassword',
    controller: 'forgotPasswordCtrl',
    templateUrl: 'templates/forgotPassword.html'
})    
.state('eventsList', {
    url: '/eventsList',
    controller: 'eventsListCtrl',
    templateUrl: 'templates/eventsList.html'
})
.state('eventDetails', {
    url: '/eventDetails/:event_id',
    controller: 'eventDetailsCtrl',
    templateUrl: 'templates/eventDetails.html'
})
.state('filterEvents', {
    url: '/filterEvents/:address/:start_date',
    controller: 'filterEventsCtrl',
    templateUrl: 'templates/filterEvents.html'
})
.state('yourBooking', {
    url: '/yourBooking',
    controller: 'yourBookingCtrl',
    templateUrl: 'templates/yourBooking.html'
})
.state('bookingSubmission', {
    url: '/bookingSubmission',
    controller: 'bookingSubmissionCtrl',
    templateUrl: 'templates/bookingSubmission.html'
})
.state('payment', {
    url: '/payment',
    controller: 'paymentCtrl',
    templateUrl: 'templates/payment.html'
});

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
