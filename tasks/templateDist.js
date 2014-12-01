var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var concat = require('gulp-concat-util');
var rename = require('gulp-rename');
var htmlmin=require('gulp-htmlmin');


var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var ngtemplate = require('gulp-ngtemplate');
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
var createModuleName = function(src) { return 'ms.NgUi.' + src.split(path.sep)[0]; };

gulp.task('templateDist', function(foo) {
    gulp.src(src.templates, {cwd: src.cwd})
        .pipe(htmlmin({removeComments: true, collapseWhitespace: true}))
        .pipe(ngtemplate({module: createModuleName}))
        .pipe(ngAnnotate())
        .pipe(concat(pkg.name + '.tpl.js', {process: function(src) { return '// Source: ' + path.basename(this.path) + '\n' + (src.trim() + '\n').replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1'); }}))
        .pipe(concat.header('(function(window, document, undefined) {\n\'use strict\';\n\n'))
        .pipe(concat.footer('\n\n})(window, document);\n'))
        .pipe(concat.header(banner))
        .pipe(gulp.dest(src.dist))
        .pipe(rename(function(path) { path.extname = '.min.js'; }))
        .pipe(uglify())
        .pipe(concat.header(banner))
        .pipe(gulp.dest(src.dist));


});