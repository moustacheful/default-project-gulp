filters.filter 'TestFilter', ->
	(val)->
		return do val.toUpperCase
