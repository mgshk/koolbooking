angular.module('eventsApp.controllers.eventDetailsCtrl', [])
    .controller('eventDetailsCtrl', ['$scope', '$state', '$stateParams', 'eventsFactory', function($scope, $state, $stateParams, eventsFactory) {
    
    if ($stateParams.event_id === "") {
        $state.go('eventsList');
    }
    eventsFactory.getEventDetails($stateParams.event_id).then(function (resp) {
        $scope.event = resp.data;
    });
}]);
