var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var svgmin      = require('gulp-svgmin');
var svgStore    = require('gulp-svgstore');
var rename      = require('gulp-rename');
var cheerio     = require('gulp-cheerio');
var through2    = require('through2');
var consolidate = require('gulp-consolidate');
var config      = require('../config');

gulp.task('sprite:svg', function() {
	return gulp
			.src(config.src.iconsSvg + '/*.svg')
			.pipe(plumber({
				errorHandler: config.errorHandler
			}))
			.pipe(svgmin({
				js2svg: {
					pretty: true
				},
				plugins: [{
					removeDesc: true
				}, {
					cleanupIDs: true
				}, {
					mergePaths: false
				}]
			}))
			.pipe(rename({ prefix: 'icon-' }))
			.pipe(svgStore({ inlineSvg: false }))
			.pipe(through2.obj(function(file, encoding, cb) {
				var $ = file.cheerio;
				var data = $('svg > symbol').map(function() {
					var $this  = $(this);
					var size   = $this.attr('viewBox').split(' ').splice(2);
					var name   = $this.attr('id');
					var ratio  = size[0] / size[1]; // symbol width / symbol height
					var stroke = $this.find('[stroke]').attr('stroke');
					return {
						name: name,
						ratio: +ratio.toFixed(2),
						stroke: stroke || 'initial'
					};
				}).get();
				this.push(file);
				cb();
			}))
			.pipe(cheerio({
				parserOptions: { xmlMode: true }
			}))
			.pipe(rename({ basename: 'sprite' }))
			.pipe(gulp.dest(config.dest.img));
});

gulp.task('sprite:svg:watch', function() {
	gulp.watch(config.src.iconsSvg + '/*.svg', ['sprite:svg']);
});
