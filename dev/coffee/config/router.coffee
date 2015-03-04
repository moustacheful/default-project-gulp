app.config ($routeProvider,$locationProvider) ->
	$locationProvider.html5Mode(true);
	
	$routeProvider
	.when '/',
		templateUrl: 'partials/home.html'

	.otherwise { redirectTo: '/' }
