'use strict'

var gulp = require('gulp');
var concat = require('gulp-concat');
var html2js = require('gulp-html2js');



gulp.task('html2js', function() {
    gulp.src('templates/**/*.html')
        .pipe(html2js({
            outputModuleName: 'ms.NgUi.tpl',
            useStrict: true
        }))
        .pipe(concat('template.js'))
        .pipe(gulp.dest('./dist'))
});
