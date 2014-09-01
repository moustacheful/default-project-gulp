angular.module 'app.filters', []

.filter 'TestFilter', [->
	(val)->
		return do val.toUpperCase
]