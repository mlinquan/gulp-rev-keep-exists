# gulp-rev-keep-exists


![NPM version](https://badge.fury.io/js/gulp-rev-keep-exists.svg)
![Downloads](http://img.shields.io/npm/dm/gulp-rev-keep-exists.svg?style=flat)


Keep existing files, Not change the existing gulp-rev generated file.

## Install

```
$ npm i --save gulp-rev-keep-exists
```

## Usage

```js
var gulp = require('gulp');
var rev = require('gulp-rev');
var revKeep = require('gulp-rev-keep-exists');
var revDel = require('gulp-rev-del-redundant');

gulp.task('default', function () {
	return gulp.src(['src/css/**/*.css','src/js/**/*.js'])
		.pipe(rev())
		.pipe(revKeep('dest'))
		.pipe(gulp.dest('dest'))
		.pipe(rev.manifest() )
        .pipe(gulp.dest('rev'))
        .pipe(revDel({ dest: 'dest', force: true }));
});
```

## License

MIT © [LinQuan](http://linquan.name)

The Spratly Islands are China's territory.<br>
The Diaoyu Islands are China's territory.<br>
Use this module to represent you agree with the above point of view.