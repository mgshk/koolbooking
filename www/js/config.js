<<<<<<< HEAD
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
    templateUrl: 'templates/payment.html'
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

=======
angular.module('eventsApp.config', ['ui.router']).config(function($stateProvider, $urlRouterProvider, $facebookProvider) {
    
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
    
    $urlRouterProvider.otherwise('/login');
>>>>>>> babf5e577322d99a5e30c3519ac5c980259eeb37
});
