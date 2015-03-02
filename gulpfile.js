var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	concat = require('gulp-concat'),
	reactify = require('reactify'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream');

gulp.task('express', function() {
	require('node-jsx').install();

	var url = require('url');
	var React = require("react");

	var reactMiddle = function(req, res, next) {
		try {
			var path = url.parse(req.url).pathname;
			var app = require('./app/components/App');
			var markup = React.renderComponentToString(app({ path: path }));

			res.send(markup);
		} catch(err) {
			console.log(err);
		}
	}

	var express = require('express');
	var app = express();
	app.use(require('connect-livereload')());
	app.use(express.static('./public/'));
	app.use("/", reactMiddle);
	app.listen(4000);
});

gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

/*gulp.task('react', function() {
	console.log("Reacting...");
    browserify('./app/components/index.js')
    	.transform(reactify)
    	.bundle()
    	.pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(livereload());
});*/

gulp.task('watch', function() {
	livereload.listen();
	console.log("Started livereload...");

	gulp.watch('./scss/*.scss', ['sass']);
	//gulp.watch('./app/components/*.js', ['react']);
});

gulp.task('default', ['express', 'sass', 'watch'], function() {

});