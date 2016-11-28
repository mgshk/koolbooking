angular.module('eventsApp.controllers.eventTabCtrl', [])
	.controller('eventTabCtrl', ['$scope', '$filter', 'eventsFactory', function($scope, $filter, eventsFactory) {

    $scope.noRecords = false;
    
	eventsFactory.getEventsList().then(function (resp) {
        $scope.eventsList = [];
        
        if(resp.status === 1) {
            angular.forEach(resp.data, function(value) {
                if(angular.isDefined(value.adult_price)) {
                    $scope.eventsList.push(value);
                }
            });
        }

        if($scope.eventsList.length === 0) {
            $scope.noRecords = true;
        }
    });

    $scope.filterEvents = function(start_date, end_date, address) {

        var startDate = $filter('date')(start_date, "yyyy-MM-dd");
        var endDate = null;
        $scope.eventsList = [];
        $scope.noRecords = false;

        if ((angular.isDefined(address) || address !== '') && angular.isDefined(start_date)) {
            eventsFactory.getFilterEvents(address, startDate, endDate).then(function (resp) {
                if(resp.status === 0) {
                    $scope.noRecords = true;
                } else {
                    angular.forEach(resp.data, function(value) {
                        if(angular.isDefined(value.adult_price)) {
                            $scope.eventsList.push(value);
                        }
                    });
                    
                    if($scope.eventsList.length === 0)
                        $scope.noRecords = true;
                } 
            });
        } else {
            eventsFactory.getEventsList().then(function (resp) {
                if(resp.status === 0) {
                    $scope.noRecords = true;
                } else {
                    angular.forEach(resp.data, function(value) {
                        if(angular.isDefined(value.adult_price)) {
                            $scope.eventsList.push(value);
                        }
                    });

                    if($scope.eventsList.length === 0)
                        $scope.noRecords = true;
                }
            });
        } 
    }
}]);
