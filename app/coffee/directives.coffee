angular.module 'app.directives', []

.directive 'TestDirective', ->
	(scope,el,attrs)->
		console.log scope, el, attrs