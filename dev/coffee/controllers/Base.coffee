controllers.controller 'BaseCtrl', ($scope, TestService)->
	$scope.name = 'gooby'
	TestService.alert $scope.name