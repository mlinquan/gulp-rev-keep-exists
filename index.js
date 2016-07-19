'use strict';
var through = require('through2');
var path = require('path');
var fs = require('fs');
var gutil = require('gulp-util');
var cache = [];

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
	cache = [];
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
			this.emit('error', new gutil.PluginError('gulp-rev-keep-exists', '\'destpath\' is not defined.'));
			cb();
			return;
		}
		cache.push(file.clone());

		if(fs.existsSync(destpath + '/' + relPath(file.base, file.path))) {
			cb();
			return;
		}

		cb(null, file);
	});
};

module.exports.restore = function() {
	return through.obj(function (file, enc, cb) {
		cb();
	}, function (cb) {
		if (cache.length) {
			cache.forEach(function (file) {
				this.push(file);
			}.bind(this));
		}
		cache = [];
		cb();
	});
};