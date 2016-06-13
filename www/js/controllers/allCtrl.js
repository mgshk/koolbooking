angular.module('eventsApp.controllers.allCtrl', [])
	.controller('allCtrl', ['$scope', '$filter', 'eventsFactory', function($scope, eventsFactory) {

    eventsFactory.getEventsList().then(function (resp) {
        $scope.eventsList = resp.data;
    });

    eventsFactory.getActivitiesList().then(function (resp) {
        $scope.activitiesList = resp.data;
    });
}]);
