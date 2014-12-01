var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');

var copy;
/*var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
*/




var requireDir = require('require-dir');
var dir = requireDir('./tasks');


gulp.task('default', ['test', 'less','html2js','scriptsDist','templateDist']);
