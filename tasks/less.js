var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function() {
    gulp.src('less/msNgUi.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('demo'));
});
