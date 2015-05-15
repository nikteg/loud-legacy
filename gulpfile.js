var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    reactify = require('reactify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    server = require('./server');

gulp.task('server', function() {
    server.listen(4000);
    console.log("Started server on http://localhost:4000");
});

gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

gulp.task('react', function() {
    console.log("Reacting...");

    browserify('./app/main.js')
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch('./scss/*.scss', ['sass']);
    gulp.watch('./app/components/*.js', ['react']);
});

gulp.task('default', ['server', 'sass', 'react', 'watch'], function() {

});

gulp.task('deploy', ['sass', 'react'], function() {

});
