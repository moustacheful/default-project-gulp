gulp = require 'gulp'
stylus = require 'gulp-stylus'
watch = require 'gulp-watch'
prefix = require 'gulp-autoprefixer'
coffee = require 'gulp-coffee'
livereload= require 'gulp-livereload'
rename = require 'gulp-rename'
cssmin = require 'gulp-cssmin'
sourcemaps= require 'gulp-sourcemaps'
plumber = require 'gulp-plumber'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
notify = require 'gulp-notify'
jade = require 'gulp-jade'

sources = require './sources'
paths =
	bower: './bower_components'
	dev: './dev'
	dist: './dist'

gulp.task 'watch', ->
	livereload.listen()
	watch paths.dev + '/stylus/**/*.styl', (files) -> gulp.start('build:css')
	watch paths.dev + '/coffee/**/*.coffee', (files) ->	gulp.start('build:coffee')
	watch paths.dev + '/partials/**/*.jade', (files) -> gulp.start('build:templates')

gulp.task 'build', [
	'bundle:js'
	'bundle:css'
]

gulp.task 'build:templates', ->
	gulp.src(paths.dev + '/partials/**/*.jade')
		.pipe(jade())
		.pipe(html2js({
			outputModuleName: 'app.templates'
		}))
		.pipe(concat('app.templates.js'))
		.pipe(gulp.dest(paths.dev + '/js'))
		.pipe(notify('Templates compiled'))

gulp.task 'build:coffee', ->
	gulp.src([
		paths.dev + '/coffee/app.coffee',
		paths.dev + '/coffee/actions.coffee',
		paths.dev + '/coffee/config/**/*.coffee',
		paths.dev + '/coffee/controllers/**/*.coffee',
		paths.dev + '/coffee/directives/**/*.coffee',
		paths.dev + '/coffee/filters/**/*.coffee',
		paths.dev + '/coffee/services/**/*.coffee'
	])
		.pipe plumber(
			errorHandler: notify.onError('Coffeescript error: <%= error.message %>')
		)
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(coffee())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.dev + '/js'))
		.pipe(notify('Coffee compiled'))

gulp.task 'build:css', ->
	gulp.src(paths.dev + '/stylus/core.styl')
		.pipe plumber(
			errorHandler: notify.onError('Stylus error: <%= error.message %>')
		)
		.pipe(stylus({
            sourcemap: {inline: true}
        }))
		.pipe(prefix())
		.pipe(rename('styles.css'))
		.pipe(gulp.dest(paths.dev + '/css/'))
		.pipe(livereload())
		.pipe(notify('Stylus compiled'))

gulp.task 'build:html', ->
	gulp.src(paths.dev + '/jade/*.jade')
		.pipe plumber(
			errorHandler: notify.onError('Jade error: <%= error.message %>')
		)
		.pipe jade(
			pretty: true
		)
		.pipe gulp.dest(paths.dev)
		.pipe notify(
			message:'Jade compiled'
			onLast: true
		)

gulp.task 'bundle:css',['build:css'], ->
	gulp.src(sources.css)
		.pipe(concat('styles.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest(paths.dev + '/resources'))


gulp.task 'bundle:js',['build:templates','build:coffee'], ->
	gulp.src(sources.js)
		.pipe(concat('bundle.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dev + '/resources'))
