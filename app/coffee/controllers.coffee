angular.module 'app.controllers', []

.controller 'BaseCtrl', ['$scope', ($scope)->
	$scope.name = 'gooby'
]

.controller 'goop', ['$scope', ($scope)->
	$scope.poppypoop = "halp"
	
]