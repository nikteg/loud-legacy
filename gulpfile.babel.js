import gulp         from 'gulp'
import watch        from 'gulp-watch'
import sass         from 'gulp-sass'
import livereload   from 'gulp-livereload'
import concat       from 'gulp-concat'
import babelify     from 'babelify'
import browserify   from 'browserify'
import source       from 'vinyl-source-stream'
import server       from './server'

gulp.task('server', () => {
  let port = 4000

  server.listen(port)
  console.log(`Started server on http://localhost:${port}`)
})

gulp.task('sass', () => {
  gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload())
})

gulp.task('babel', () => {
  browserify('./app/index.js')
    .transform(babelify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(livereload())
})

gulp.task('watch', () => {
  livereload.listen()

  gulp.watch('./scss/*.scss', ['sass'])
  gulp.watch('./app/components/*.js', ['babel'])
})

gulp.task('default', ['server', 'sass', 'babel', 'watch'])
gulp.task('deploy', ['sass', 'babel'])
