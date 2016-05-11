angular.module('eventsApp', ['ionic', 'ngCordovaOauth', 'eventsApp.controllers', 'eventsApp.config', 'eventsApp.factories', 'eventsApp.services'])
  .run(function($rootScope, $window, $state, $ionicPlatform) {
    
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
  'eventsApp.controllers.paymentCtrl',
  'eventsApp.controllers.showcaseTabCtrl',
  'eventsApp.controllers.ticketsTabCtrl',
  'eventsApp.controllers.youTabCtrl',
  'eventsApp.controllers.discoverTabCtrl',
  'eventsApp.controllers.purchaseHistoryCtrl',
  'eventsApp.controllers.settingCtrl',
  'eventsApp.controllers.allCtrl',
  'eventsApp.controllers.eventTabCtrl',
  'eventsApp.controllers.activityCtrl'
]);

// Factories
angular.module('eventsApp.factories', [
  'eventsApp.factory.loginFactory',
  'eventsApp.factory.eventsFactory',
  'eventsApp.factory.userFactory'
]);

// Services
angular.module('eventsApp.services', [
  'eventsApp.service.loginService',
  'eventsApp.service.eventsService',
  'eventsApp.service.userService'
]);



