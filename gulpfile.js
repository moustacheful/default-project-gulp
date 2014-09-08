var gulp			= require('gulp'),
	stylus			= require('gulp-stylus'),
	watch			= require('gulp-watch'),
	prefix			= require('gulp-autoprefixer'),
	coffee			= require('gulp-coffee'),
	livereload		= require('gulp-livereload'),
	rename			= require('gulp-rename'),
	imagemin		= require('gulp-imagemin'),
	cssmin			= require('gulp-cssmin'),
	sourcemaps		= require('gulp-sourcemaps'),
	plumber			= require('gulp-plumber'),
	concat			= require('gulp-concat'),
	processhtml		= require('gulp-processhtml'),
	uglify			= require('gulp-uglify'),
	html2js			= require('gulp-html2js'),
	notify			= require('gulp-notify'),
	ngAnnotate		= require('gulp-ng-annotate')

var paths = {
	bower: './bower_components',
	dev: './dev',
	dist: './dist'
}

var jsThirdParty = [
	paths.bower + '/angular/angular.js',
	paths.bower + '/jquery/dist/jquery.js'
]

gulp.task('watch', function() {
	livereload.listen();
	watch({glob:paths.dev + '/css/**/*.css'}).on('change',livereload.changed);
	
	watch({glob:paths.dev + '/stylus/**/*.styl'}, function(files){
		gulp.start('build:css')
	})
	watch({glob:paths.dev + '/coffee/**/*.coffee'}, function(files){
		gulp.start('build:coffee')
	}) 
});

gulp.task('build', [
	'build:coffee',
	'copy:js:app',
	'copy:js:thirdparty',
	'build:css',
	'copy:css',
	'copy:images',
	//'copy:png',
	'copy:etc',
	'processhtml'
])

gulp.task('build:templates', function() {
	gulp.src(paths.dev + '/partials/**/*.html')
		.pipe(html2js({
			outputModuleName: 'app.templates'
		}))
		.pipe(concat('app.templates.js'))
		.pipe(gulp.dest(paths.dev + '/js'))
		.pipe(notify('Templates compiled'))
})

gulp.task('build:coffee', function() {
	gulp.src([
		paths.dev + '/coffee/app.coffee',
		paths.dev + '/coffee/controllers/**/*.coffee',
		paths.dev + '/coffee/directives/**/*.coffee',
		paths.dev + '/coffee/filters/**/*.coffee',
		paths.dev + '/coffee/services/**/*.coffee'
	])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(coffee())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.dev + '/js'))
		.pipe(notify('Coffee compiled'))
})
gulp.task('build:css', function() {
	gulp.src(paths.dev + '/stylus/core.styl')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(prefix())
		.pipe(sourcemaps.write())
		.pipe(rename('styles.css'))
		.pipe(gulp.dest(paths.dev + '/css/'))
		.pipe(notify('Stylus compiled'))
})

gulp.task('copy:etc', function() {
	gulp.src([
		paths.dev + '/**/*.php',
	]).pipe(gulp.dest(paths.dist));
})
gulp.task('copy:images', function() {
	gulp.src([
		paths.dev + '/images/**/*.jpg',
		paths.dev + '/images/**/*.gif',
	], {
		base: paths.dev
	})
		.pipe(gulp.dest(paths.dist));
});
gulp.task('copy:png', function() {
	gulp.src(paths.dev + '/**/*.png', {
		base: paths.dev
	})
		.pipe(imagemin({
			progressive: true,
			pngquant: true
		}))
		.pipe(gulp.dest(paths.dist))
});
gulp.task('copy:css', function() {
	gulp.src(paths.dev + '/css/**/*.css', {
		base: paths.dev
	})
		.pipe(cssmin())
		.pipe(gulp.dest(paths.dist))
});
gulp.task('copy:js:app', function() {
	gulp.src(paths.dev + '/js/*.js')
		.pipe(concat('app.min.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist + '/js'))
});
gulp.task('copy:js:thirdparty', function() {
	gulp.src(jsThirdParty)
		.pipe(concat('modules.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist + '/js'))
})
gulp.task('processhtml', function() {
	gulp.src(paths.dev + '/index.html')
		.pipe(processhtml('index.html'))
		.pipe(gulp.dest(paths.dist))
})