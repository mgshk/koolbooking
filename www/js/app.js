// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('eventsApp', ['ionic', 'eventsApp.controllers', 'eventsApp.config', 'eventsApp.factories', 'eventsApp.services'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

// Controllers
angular.module('eventsApp.controllers', [
  'eventsApp.controllers.homeCtrl',
  'eventsApp.controllers.loginCtrl',
  'eventsApp.controllers.signupCtrl',
  'eventsApp.controllers.forgotPasswordCtrl',
  'eventsApp.controllers.eventsListCtrl',
  'eventsApp.controllers.eventDetailsCtrl',
  'eventsApp.controllers.filterEventsCtrl',
  'eventsApp.controllers.bookingSubmissionCtrl',
  'eventsApp.controllers.yourBookingCtrl',
  'eventsApp.controllers.paymentCtrl'
]);

// Factories
angular.module('eventsApp.factories', [
  'eventsApp.factory.loginFactory',
  'eventsApp.factory.eventsFactory'
]);

// Services
angular.module('eventsApp.services', [
  'eventsApp.service.loginService',
  'eventsApp.service.eventsService'
]);


