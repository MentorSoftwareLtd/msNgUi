var mocha = require('gulp-mocha');
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('test', function() {
    return gulp.src('tests/server/**/*Spec.js', {read: false})
        .pipe(mocha({reporter: 'list'}))
        .on('error', gutil.log);
});