angular.module('eventsApp.controllers.eventPaymentCtrl', ['onsen'])
	.controller('eventPaymentCtrl', ['$scope', '$state', '$stateParams', 'eventsFactory', function($scope, $state, $stateParams, eventsFactory) {

    eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
        $scope.event = resp.data;
    });

}]);
