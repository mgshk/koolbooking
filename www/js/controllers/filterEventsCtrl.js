angular.module('eventsApp.controllers.filterEventsCtrl', [])
    .controller('filterEventsCtrl', ['$scope', '$stateParams', 'eventsFactory', function($scope, $stateParams, eventsFactory) {
    
    eventsFactory.getFilterEvents($stateParams.address, $stateParams.date).then(function (resp) {
        $scope.filterEvents = resp.data;
    });
}]);