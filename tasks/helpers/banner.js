var gulp = require('gulp');
var gutil = require('gulp-util');
var pkg = require('../../package.json');



var banner = gutil.template('/**\n' +
' * <%= pkg.name %>\n' +
' * @version v<%= pkg.version %> - <%= today %>\n' +
' * @link <%= pkg.homepage %>\n' +
' * @author <%= pkg.author.name %> (<%= pkg.author.email %>)\n' +
' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
' */\n', {file: '', pkg: pkg, today: new Date().toISOString().substr(0, 10)});


module.exports=banner;