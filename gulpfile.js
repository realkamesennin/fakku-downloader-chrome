var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('scripts', function() {
  return gulp.src(['lib/FileSaver/FileSaver.js', 'lib/zip.js/WebContent/zip.js', 'lib/zip.js/WebContent/deflate.js', 'lib/zip.js/WebContent/inflate.js', 'src/main.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('files', function(){

    return gulp.src(['src/manifest.json', 'src/icon.png'])
      .pipe(gulp.dest('dist/'))

});

gulp.task('clean', function(cb) {
    del(['dist/'], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('scripts', 'files');
});