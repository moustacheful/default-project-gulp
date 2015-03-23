app = angular.module 'app', [
	'ngRoute'
	'ngSanitize'
	'ngAnimate'
	'app.filters'
	'app.services'
	'app.directives'
	'app.controllers'
	'app.templates'
]
filters = angular.module 'app.filters', []
services = angular.module 'app.services', []
directives = angular.module 'app.directives', []
controllers = angular.module 'app.controllers', []