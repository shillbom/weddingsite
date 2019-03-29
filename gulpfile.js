'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var deploy = require('gulp-gh-pages');

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'));
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./js'));
});

// minify js
gulp.task('copy', function () {
    return gulp.src(['*js/**/*', '*css/**/*', 'index.html', 'CNAME', '*.png', 'manifest.json', '*.ico'])
        .pipe(gulp.dest('./dist'));
});

// deploy 
gulp.task('deploy', gulp.series('sass', 'minify-js', 'copy'), function () {
    return gulp.src("./dist/**/*")
      .pipe(deploy())
  });

// default task
gulp.task('default', gulp.series('sass', 'minify-js'));