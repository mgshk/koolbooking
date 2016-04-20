angular.module('eventsApp.controllers.eventsListCtrl', [])
    .controller('eventsListCtrl', ['$scope', '$state', 'eventsFactory', function($scope, $state, eventsFactory) {
	
    eventsFactory.getEventsList().then(function (resp) {
        $scope.events = resp.data;
        console.log(resp);
    });
}]);
