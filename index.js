'use strict';
var through = require('through2');
var path = require('path');
var fs = require('fs');
var gutil = require('gulp-util');

function relPath(base, filePath) {
	if (filePath.indexOf(base) !== 0) {
		return filePath.replace(/\\/g, '/');
	}

	var newPath = filePath.substr(base.length).replace(/\\/g, '/');

	if (newPath[0] === '/') {
		return newPath.substr(1);
	}

	return newPath;
}

module.exports = function (destpath) {

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(null, file);
			return;
		}

		if(!destpath) {
			cb(new gutil.PluginError('gulp-rev-mapping', '\'destpath\' is not defined.'));
			return;
		}

		if(fs.existsSync(destpath + '/' + relPath(file.base, file.path))) {
			cb();
			return;
		}

		cb(null, file);
	});
};