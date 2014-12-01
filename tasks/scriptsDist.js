var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var concat = require('gulp-concat-util');
var rename = require('gulp-rename');


var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var pkg = require('../package.json');



var banner = require('./helpers/banner');


var src = {
    cwd: 'src',
    dist: 'dist',
    scripts: '*/*.js',
    index: 'module.js',
    templates: '*/*.tpl.html'
};

gulp.task('scriptsDist', function(foo) {
    gulp.src([src.index, src.scripts], {cwd: src.cwd})
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(concat(pkg.name + '.js', {process: function(src) { return '// Source: ' + path.basename(this.path) + '\n' + (src.trim() + '\n').replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1'); }}))
        .pipe(concat.header('(function(window, document, undefined) {\n\'use strict\';\n'))
        .pipe(concat.footer('\n})(window, document);\n'))
        .pipe(concat.header(banner))
        .pipe(gulp.dest(src.dist))
        .pipe(rename(function(path) { path.extname = '.min.js'; }))
        .pipe(uglify())
        .pipe(concat.header(banner))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(src.dist));

    gulp.src(src.scripts, {cwd: src.cwd})
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(rename(function(path){ path.dirname = ''; })) // flatten
        .pipe(concat.header(banner))
        .pipe(gulp.dest(path.join(src.dist, 'modules')))
        .pipe(rename(function(path) { path.extname = '.min.js'; }))
        .pipe(uglify())
        .pipe(concat.header(banner))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.join(src.dist, 'modules')));


});