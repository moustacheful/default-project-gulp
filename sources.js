var _ = require('lodash');
var sources = {
	js: [
		'bower_components/lodash/dist/lodash.js',
		'bower_components/angular/angular.js',
		'bower_components/angular-animate/angular-animate.js',
		'bower_components/angular-sanitize/angular-sanitize.js',
		'bower_components/angular-route/angular-route.js',
		'js/app.js',
		'js/app.templates.js'
	],
	css: [
		'css/styles.css'
	],

	prependFullPath: function(){
		_.each( sources.js, function(item,i,arr){
			if( _.startsWith(item,'js/') ){
				arr[i] = 'dev/' + item;
			}
		})
		_.each( sources.css, function(item,i,arr){
			if( _.startsWith(item,'css/') ){
				arr[i] = 'dev/' + item;
			}
		})
	}
}

module.exports = sources;