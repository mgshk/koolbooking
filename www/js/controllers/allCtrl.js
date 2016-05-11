angular.module('eventsApp.controllers.allCtrl', [])
	.controller('allCtrl', ['$scope', 'eventsFactory', function($scope, eventsFactory) {


	eventsFactory.getEventsList().then(function (resp) {
        $scope.eventsList = resp.data;
    });

}]);
