angular.module('eventsApp.config', ['ui.router']).config(function($stateProvider, $urlRouterProvider, $facebookProvider) {
    
  $facebookProvider.setAppId('1677847679144225');

  $stateProvider
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
      url: '/filterEvents',
      controller: 'filterEventsCtrl',
      templateUrl: 'templates/filterEvents.html'
  })
  .state('bookingSubmission', {
      url: '/bookingSubmission/:event_id/:adult/:child',
      controller: 'bookingSubmissionCtrl',
      templateUrl: 'templates/bookingSubmission.html'
  })
  .state('yourBooking', {
      url: '/yourBooking/:event_id',
      controller: 'yourBookingCtrl',
      templateUrl: 'templates/yourBooking.html'
  })
  .state('payment', {
      url: '/payment',
      controller: 'paymentCtrl',
      templateUrl: 'templates/payment.html'
  })
  .state('purchasehistory', {
      url: '/purchasehistory',
      controller: 'purchaseHistoryCtrl',
      templateUrl: 'templates/purchasehistory.html'
  })
  .state('setting', {
      url: '/setting',
      controller: 'settingCtrl',
      templateUrl: 'templates/setting.html'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
