angular.module('eventsApp.controllers.userCtrl', [])
    .controller('userCtrl', ['$scope', '$state', '$stateParams', 'userFactory', function($scope, $state, $stateParams, userFactory) {

    userFactory.getUserPurchaseHistory($stateParams.user_id).then(function(resp) {
	    $scope.userHistory = resp;   
	});
}]);
