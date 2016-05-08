angular.module('eventsApp', ['ionic', 'ngFacebook', 'eventsApp.controllers', 'eventsApp.config', 'eventsApp.factories', 'eventsApp.services'])
  .run(function($rootScope, $window, $state, $ionicPlatform) {
    
    // Load the facebook SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "http://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
    $rootScope.$on('fb.load', function() {
      $window.dispatchEvent(new Event('fb.load'));
    });
    
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
  'eventsApp.controllers.settingCtrl'
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



