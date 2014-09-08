services.service 'TestService', ->
	service = 
		alert: (name) ->
			console.log 'hello',name