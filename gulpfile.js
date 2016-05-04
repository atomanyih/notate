var gulp = require('gulp');
var rename = require('gulp-rename');
var webpack = require('webpack-stream');
var connect = require('gulp-connect');

var config = require('./webpack.config');

gulp.task('build-js', function() {
  return gulp.src('src/index.js')
    .pipe(webpack(config))
    .pipe(rename('index.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy-html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('setup-watchers', function(callback) {
  process.env.WEBPACK_WATCH = true;
  gulp.watch(['src/**/*.js'], ['build-js']);
  gulp.watch(['src/**/*.html'], ['copy-html']);
  callback();
});

gulp.task('build', ['build-js', 'copy-html']);

gulp.task('webserver', ['setup-watchers', 'build'], function () {
  connect.server({root: 'dist'});
});