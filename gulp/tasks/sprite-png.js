var gulp        = require('gulp');
var spritesmith = require('gulp.spritesmith');
var config      = require('../config');

gulp.task('sprite:png', function() {
	var spriteData =
		gulp.src(config.src.iconsPng + '/*.png')
			.pipe(spritesmith({
				imgName: 'sprite.png',
				imgPath: '../img/sprite.png',
				retinaSrcFilter: [config.src.iconsPng + '/*@2x.png'],
				retinaImgName: 'sprite@2x.png',
				retinaImgPath: config.dest.img + '/sprite@2x.png',
				cssName: '_sprite-png.scss',
				cssFormat: 'scss',
				padding: 6,
				algorithm: 'top-down'
			}));
	spriteData.img.pipe(gulp.dest(config.dest.img));
	spriteData.css.pipe(gulp.dest(config.src.sassGen));
});

gulp.task('sprite:png:watch', function() {
	gulp.watch(config.src.iconsPng + '/*.png', ['sprite:png']);
});
