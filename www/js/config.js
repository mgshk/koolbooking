angular.module('eventsApp.config', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

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
      url: '/eventsList/:tab',
      controller: 'eventsListCtrl',
      templateUrl: 'templates/eventsList.html'
  })
  .state('eventDetails', {
      url: '/eventDetails/:event_id',
      controller: 'eventDetailsCtrl',
      templateUrl: 'templates/eventDetails.html'
  })
  .state('bookingSubmission', {
      url: '/bookingSubmission/:adult/:child/:infant',
      controller: 'bookingSubmissionCtrl',
      templateUrl: 'templates/bookingSubmission.html'
  })
  .state('yourBooking', {
      url: '/yourBooking',
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
  })
  .state('all', {
      url: '/all',
      controller: 'allCtrl',
      templateUrl: 'templates/all.html'
  })
  .state('eventTab', {
      url: '/eventTab',
      controller: 'eventTabCtrl',
      templateUrl: 'templates/eventtab.html'
  })
  .state('activity', {
      url: '/activity',
      controller: 'activityCtrl',
      templateUrl: 'templates/activity.html'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
